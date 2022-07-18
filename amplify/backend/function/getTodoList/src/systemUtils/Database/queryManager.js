const {
  ExecuteStatementCommand,
  BatchExecuteStatementCommand,
} = require("@aws-sdk/client-dynamodb");

const ddbDocClient = require("./ddbDocClient");
const logger = require("../Logger/Logger");
const { SystemException } = require("../Errors/Exceptions");

const execute = async (statement, param) => {
  logger.debug("dynamoDB execute statement :", statement.split("\n"));
  logger.debug("dynamoDB execute param :", param);

  const parameters = {
    Statement: statement,
    Parameters: param,
  };

  try {
    const data = await ddbDocClient.send(
      new ExecuteStatementCommand(parameters)
    );
    logger.debug("dynamoDB execute result :", data);
    return data.Items;
  } catch (error) {
    throw new SystemException(error);
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
