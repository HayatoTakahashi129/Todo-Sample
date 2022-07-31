const {
  ExecuteStatementCommand,
  BatchExecuteStatementCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const ddbDocClient = require("./ddbDocClient");
const logger = require("../Logger/Logger");
const { SystemException } = require("../Errors/Exceptions");

const execute = async (statement, param) => {
  logger.debug("dynamoDB execute statement :", statement.split("\n"));
  const convertedParam = param.map((item) => marshall(item));
  const parameters = {
    Statement: statement,
    Parameters: convertedParam,
  };
  logger.debug("dynamoDB execute param :", convertedParam);

  try {
    const data = await ddbDocClient.send(
      new ExecuteStatementCommand(parameters)
    );
    logger.debug("dynamoDB execute result :", data);
    if (data.Items) return data.Items.map((item) => unmarshall(item));
    return;
  } catch (error) {
    throw new SystemException(
      500,
      error,
      "Failed to execute dynamoDB statement"
    );
  }
};

const executeBatch = async (statements, params) => {
  logger.debug("dynamoDB execute statements :", statements.split("\n"));
  logger.debug("dynamoDB execute params :", params);

  let count = 0;
  const parameters = statements.map((statement) => {
    return {
      Statement: statement,
      Parameters: params[count++],
    };
  });

  try {
    const data = await ddbDocClient.send(
      new BatchExecuteStatementCommand(parameters)
    );
    logger.debug("dynamoDB execute results :", data);
    return data.Responses;
  } catch (error) {
    throw new SystemException(error);
  }
};

exports.execute = execute;
exports.executeBatch = executeBatch;
