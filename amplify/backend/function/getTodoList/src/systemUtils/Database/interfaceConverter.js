const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

exports.reshapeResult = (result) => result.map((item) => unmarshall(item));

exports.createConditionParams = (params) => {
  const valueList = Object.values(params);
  const statement = valueList.map((value) => marshall(value));

  return statement;
};
