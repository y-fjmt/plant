import json
import boto3

def lambda_handler(event, context):
    
    # return {
    #         'statusCode': 200,
    #         'body': json.dumps(event)
    #     }
    
    method = event['requestContext']['http']['method']
    
    if method == 'GET':
        
        params = event.get('queryStringParameters')
        
        # DynamoDBへの接続
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('plant-articles')  # 'notification' にはテーブル名を指定してください

        # N個のアイテムをdateTimeキーの新しい順に取得
        response = table.scan()
        items = response.get('Items', [])
        
        # items = sorted(items, key=lambda x: x['modified'], reverse=True)
        res = []
        
        if params:
            for i in items:
                if i['ownUserId'] == params.get('userId') and i['isPublic'] == True:
                    res.append({
                        'likes': int(i['likes']),
                        'modified': i['modified'],
                        'ownUserId': i['ownUserId'],
                        'tags': i['tags'],
                        'userIcon': i['userIcon'],
                        'userName': i['userName']
                    })
        else:
            for i in items:
                if i['isPublic'] == True:
                    res.append({
                        'likes': int(i['likes']),
                        'modified': i['modified'],
                        'ownUserId': i['ownUserId'],
                        'tags': i['tags'],
                        'userIcon': i['userIcon'],
                        'userName': i['userName']
                    })
        # レスポンスを返す
        return  {
            'statusCode': 200,
            'body': json.dumps(res[:min(3, len(res))])
        }