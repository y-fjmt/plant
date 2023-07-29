import json
import boto3
import uuid
from datetime import datetime

def lambda_handler(event, context):
    
    # return {
    #         'statusCode': 200,
    #         'body': json.dumps(event)
    #     }
    
    current_datetime = datetime.now()
    formatted_string = current_datetime.strftime("%Y/%m/%d %H:%M:%S")
    
    method = event['requestContext']['http']['method']
    
    if method == 'GET':
        params = event['queryStringParameters']
        userId = params.get('userId')
        ownUserId = params.get('ownUserId')
        prId = params.get('prId')
        
        res = []
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-pullrequest')
        
        if prId:
            response = table.get_item(Key={'prId': prId})
            print(response)
            items = response.get('Item')
            res = [items]
        else:
            response = table.scan()
            items = response.get('Items', [])

                
            # ユーザーIDからコミットを取得
            if userId:
                for i in items:
                    if i['userId'] == userId:
                        res.append(i)
            
            # 記事IDからコミットを取得
            if ownUserId:
                for i in items:
                    if i['ownUserId'] == ownUserId:
                        res.append(i)
                
        return {
            'statusCode': 200,
            'body': json.dumps(res)
        }
        
    elif method == 'POST':
        
        # POSTリクエストのボディからデータを取得
        request_body = json.loads(event['body'])

        # リクエストデータを変数に格納
        prId = request_body.get('prId')
        userId = request_body['userId']
        articleId = request_body['articleId']
        articlePos = request_body['articlePos']
        ownUserId = request_body['ownUserId']
        content = request_body['content']
        isPublic = request_body['isPublic']
        
        # DynamoDBへの接続
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-articles')

        # アイテムの作成
        item = {
            "userId": userId,
            "articleId": articleId,
            "articlePos": articlePos,
            "ownUserId": ownUserId,
            "content": content,
            'modified': formatted_string,
            'isPublic': isPublic
        }
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-pullrequest')
        

        # クエリが作成か更新どちらであるか
        if prId:
            # commitを更新
            response = table.update_item(
                Key={
                    'prId': prId
                },
                UpdateExpression='SET content = :content, modified = :modified, isPublic = :isPublic',
                ExpressionAttributeValues={
                    ':content': item['content'],
                    ':modified': item['modified'],
                    ':isPublic': item['isPublic']
                }
            )
            
            if item['isPublic'] == True:
                # 公開設定なら記事の持ち主に通知を作成
                notify = {
                    'receve': formatted_string,
                    'notiId': str(uuid.uuid4()),
                    'userId': ownUserId,
                    'kind': 'pull request',
                    'articleId': articleId,
                    'fromUserId': userId
                }
                
                table = dynamodb.Table('plant-notification')
                response = table.put_item(Item=notify)
                
            return {
                'statusCode': 200,
                'body': json.dumps({'msg': f'update {prId}'})
            }
        else:
            # PRを作成
            item['prId'] = str(uuid.uuid4())
            item['isMarged'] = False
            response = table.put_item(Item=item)
            
            if item['isPublic'] == True:
                # 公開設定なら記事の持ち主に通知を作成
                notify = {
                    'receve': formatted_string,
                    'notiId': str(uuid.uuid4()),
                    'userId': ownUserId,
                    'kind': 'pull request',
                    'articleId': articleId,
                    'fromUserId': userId
                }
                
                table = dynamodb.Table('plant-notification')
                response = table.put_item(Item=notify)

            return {
                'statusCode': 200,
                'body': json.dumps({'prId': item['prId']})
            }
    elif method == 'DELETE':
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-pullrequest')  # テーブル名を指定してください

        prId = event['queryStringParameters']['prId']

        response = table.delete_item(Key={'prId': prId})


        return {
            'statusCode': 200,
            'body': json.dumps({'prId': prId})
        }
