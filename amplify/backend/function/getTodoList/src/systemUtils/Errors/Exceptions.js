const logger = require("../Logger/Logger");

class SystemException extends Error {
  constructor(status = 500, error, logMessage = "SomeThing happen.") {
    super(logMessage);
    this.status = status;
    this.type = "SYSTEM_ERROR";
    if (error) logger.error(logMessage, error);
  }
}

class BuisnessException extends Error {
  constructor(
    status = 400,
    displayMessage = "Something you entered is wrong",
    logMessage = "Something Error happen",
    error = null
  ) {
    super(logMessage);
    this.displayMessage = displayMessage;
    this.status = status;
    this.type = "BUISINESS_ERROR";
    if (typeof displayMessage === "object" && displayMessage?.type) {
      this.type = displayMessage.type;
    }
    if (logMessage || error) logger.info(logMessage, error);
  }
}

exports.SystemException = SystemException;
exports.BuisnessException = BuisnessException;
