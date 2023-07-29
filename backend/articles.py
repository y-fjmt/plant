import json
import boto3
import uuid
from datetime import datetime

def lambda_handler(event, context):
    
    method = event['requestContext']['http']['method']
    
    current_datetime = datetime.now()
    formatted_string = current_datetime.strftime("%Y/%m/%d %H:%M:%S")
    
    if method == 'GET':
        params = event['queryStringParameters']
        article_id = params['articleId']
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-articles')
        
        # 必要なカラムを取り出す
        response = table.get_item(Key={'articleId': article_id})
        item = response.get('Item', {})
        
        return {
            'statusCode': 200,
            'body': json.dumps(item)
        }
    
        
    elif method == 'POST':
        # POSTリクエストのボディからデータを取得
        request_body = json.loads(event['body'])

        # リクエストデータを変数に格納
        article_id = request_body.get('articleId')
        own_user_id = request_body['ownUserId']
        content = request_body['content']
        tags = json.dumps(request_body['tags'])
        is_public = request_body['isPublic']

        # DynamoDBへの接続
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-articles')

        # アイテムの作成
        item = {
            'articleId': article_id,
            'ownUserId': own_user_id,
            'modified': formatted_string,
            'content': content,
            'tags': tags,
            'isPublic': is_public,
            'likes': 0
        }

        # articleIdが存在する場合はデータを上書き
        if article_id:
            # アイテムの更新
            response = table.update_item(
                Key={
                    'articleId': article_id
                },
                UpdateExpression='SET content = :content,  modified = :modified, isPublic = :isPublic, ownUserId = :ownUserId, tags = :tags',
                ExpressionAttributeValues={
                    ':content': item['content'],
                    ':modified': item['modified'],
                    ':isPublic': item['isPublic'],
                    ':ownUserId': item['ownUserId'],
                    ':tags': item['tags']
                }
            )
            return {
                'statusCode': 200,
                'body': json.dumps({'msg': f'update {article_id}'})
            }
            
        else:
            # 新しい記事の作成
            item['articleId'] = str(uuid.uuid4())
            response = table.put_item(Item=item)

            return {
                'statusCode': 200,
                'body': json.dumps({'articleId': item['articleId']})
            }
            

