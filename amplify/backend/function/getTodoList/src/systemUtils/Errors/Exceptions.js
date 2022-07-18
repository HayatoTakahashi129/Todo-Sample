class SystemException extends Error {
  constructor(status = 500, logMessage = "SomeThing happen.") {
    super(logMessage);
    this.status = status;
  }
}

class BuisnessException extends Error {
  constructor(
    status = 400,
    displayMessage = "Something you entered is wrong",
    logMessage = "Something Error happen"
  ) {
    super(logMessage);
    this.displayMessage = displayMessage;
    this.status = status;
  }
}

exports.SystemException = SystemException;
exports.BuisnessException = BuisnessException;
