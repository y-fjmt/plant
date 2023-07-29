import json
import boto3
import uuid
from datetime import datetime

def lambda_handler(event, context):

    # return {
    #     'statusCode': 200,
    #     'body': json.dumps(event)
    # }
    
    # アカウントが存在するか確認。存在しない場合は作成
    request_body = json.loads(event['body'])
        
    userId = request_body.get('userId')
    userName = request_body.get('userName')
    
    # キーを指定してアイテムを取得
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('plant-UserData')
    
    response = table.get_item(Key={'userId': userId})

    # アカウントのの有無を確認
    if 'Item' in response:
        # アイテムが存在する場合
        item = response['Item']
        print(f"userId '{userId}' が存在します。")
        return {
            'statusCode': 200,
            'body': json.dumps(item)
        }
    else:
        # アイテムが存在しない場合
        print(f"userId '{userId}' は存在しません。")
        defaultData = {
            'userId': userId,
            'userName': userName,
            'articleIds': '',
            'commitIds': '',
            'PRids': '',
            'likedArticleIds': '',
        }
        table.put_item(Item=defaultData)
        return {
            'statusCode': 200,
            'body': json.dumps(defaultData)
        }
    
    