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
        articleId = params.get('articleId')
        
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-commits')

        response = table.scan()
        items = response.get('Items', [])

        res = []
        
        # ユーザーIDからコミットを取得
        if userId:
            for i in items:
                if i['userId'] == userId:
                    i['likes'] = int(i['likes'])
                    res.append(i)
        
        # 記事IDからコミットを取得
        if articleId:
            for i in items:
                if i['articleId'] == articleId:
                    i['likes'] = int(i['likes'])
                    res.append(i)
                
        print(res)
                
        return {
            'statusCode': 200,
            'body': json.dumps(res)
        }
        
    elif method == 'POST':
        
        # POSTリクエストのボディからデータを取得
        request_body = json.loads(event['body'])

        # リクエストデータを変数に格納
        commitId = request_body.get('commitId')
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
        table = dynamodb.Table('plant-commits')
        

        # クエリが作成か更新どちらであるか
        if commitId:
            # commitを更新
            response = table.update_item(
                Key={
                    'commitId': commitId
                },
                UpdateExpression='SET content = :content, modified = :modified, isPublic = :isPublic',
                ExpressionAttributeValues={
                    ':content': item['content'],
                    ':modified': item['modified'],
                    ':isPublic': item['isPublic']
                }
            )
            return {
                'statusCode': 200,
                'body': json.dumps({'msg': f'update {commitId}'})
            }
        else:
            # commitを作成
            item['commitId'] = str(uuid.uuid4())
            item['likes'] = 0
            response = table.put_item(Item=item)
            
            # 記事の持ち主に通知を作成
            notify = {
                'receve': formatted_string,
                'notiId': str(uuid.uuid4()),
                'userId': ownUserId,
                'kind': 'commit',
                'articleId': articleId,
                'fromUserId': userId
            }
            table = dynamodb.Table('plant-notification')
            response = table.put_item(Item=notify)

            return {
                'statusCode': 200,
                'body': json.dumps({'commitId': item['commitId']})
            }
