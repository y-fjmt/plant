import json
import boto3

def lambda_handler(event, context):
    
    # return {
    #         'statusCode': 200,
    #         'body': json.dumps(event)
    #     }
    
    method = event['requestContext']['http']['method']
    
    if method == 'GET':
        
        params = event['queryStringParameters']
        
        # DynamoDBへの接続
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-notification')  # 'notification' にはテーブル名を指定してください
        
        n, userId = int(params['size']), params['userId']

        # N個のアイテムをdateTimeキーの新しい順に取得
        response = table.scan()
        items = response.get('Items', [])
        
        res = []

        for i in items:
            if len(res) >= n:
                break
            # print(i['userId'], userId, i['userId'] == userId)
            if i['userId'] == userId:
                res.append(i)
                        
        # レスポンスを返す
        return  {
            'statusCode': 200,
            'body': json.dumps(res)
        }
        
    elif method == 'DELETE':
        
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-notification')  # テーブル名を指定してください

        notiId = event['queryStringParameters']['notiId']

        response = table.delete_item(Key={'notiId': notiId})


        return {
            'statusCode': 200,
            'body': json.dumps({'notiId': notiId})
        }
