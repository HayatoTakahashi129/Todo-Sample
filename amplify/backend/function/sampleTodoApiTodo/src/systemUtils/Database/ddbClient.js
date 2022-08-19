const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const REGION = process.env.REGION;
module.exports = new DynamoDBClient({ region: REGION });
