const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} = require('@aws-sdk/lib-dynamodb');


const tableName = 'georgianSms';

class DataBaseService {
  constructor() {
    this.client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  }

  async getItemById(id) {
    if (!id) {
      return 'Error';
    }

    const response = await this.client.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          id: id.toString(),
        },
      })
    );

    return response.Item;
  }

  async updateItem(id, lang) {
    if (!id || !lang) {
      return 'Error';
    }

    const response = await this.client.send(
      new PutCommand({
        TableName: tableName,
        Item: {
          id: id.toString(),
          lang: lang,
        },
      })
    );

    return response;
  }
}

module.exports = new DataBaseService();
