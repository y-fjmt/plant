import json
import boto3
import uuid
from datetime import datetime

def lambda_handler(event, context):
    
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps(event)
    # }
    
    current_datetime = datetime.now()
    formatted_string = current_datetime.strftime("%Y/%m/%d %H:%M:%S")
    
    method = event['requestContext']['http']['method']
        
    if method == 'POST':
        # POSTリクエストのボディからデータを取得
        request_body = json.loads(event['body'])
        article_id = request_body.get('articleId')
        userId = request_body.get('userId')
        ownUserId = request_body.get('ownUserId')
        
        
        # ユーザーのいいねリストに記事を追加
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-UserData')

        response = table.get_item(Key={'userId': userId})
        item = response.get('Item', {})
        
        if article_id in item['likedArticleIds']:
             return {
                    'statusCode': 200,
                    'body': json.dumps({'msg': 'already liked.'})
                }
        
        likedArticleIds = item['likedArticleIds'] + f'/{article_id}'
        
        response = table.update_item(
            Key={'userId': userId},
            UpdateExpression='SET likedArticleIds = :likedArticleIds',
            ExpressionAttributeValues={
                ':likedArticleIds': likedArticleIds,
            }
        )
        
        
        # 記事のいいね数を増やす
        table = dynamodb.Table('plant-articles')
        response = table.get_item(Key={'articleId': article_id})
        item = response.get('Item', {})
                
        likes = item['likes'] + 1
        
        response = table.update_item(
            Key={'articleId': article_id},
            UpdateExpression='SET likes = :likes',
            ExpressionAttributeValues={
                ':likes': likes,
            }
        )
        
        # 通知を送信
        notify = {
            'receve': formatted_string,
            'notiId': str(uuid.uuid4()),
            'userId': ownUserId,
            'kind': 'like',
            'articleId': article_id,
            'fromUserId': userId
        }
        table = dynamodb.Table('plant-notification')
        response = table.put_item(Item=notify)
        
        return {
            'statusCode': 200,
            'body': json.dumps({})
        }
