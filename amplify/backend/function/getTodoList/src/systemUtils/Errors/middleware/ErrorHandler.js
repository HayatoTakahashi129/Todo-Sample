const logger = require("../../Logger/Logger");
const { SystemException, BuisnessException } = require("../Exceptions");
const { asyncLocalStorage } = require("../../ThreadLocal/ThreadStorage");

exports.logError = (err, req, res, next) => {
  logger.error("ErrorHandler: Unknown Error has occurred.", err.stack);
  return next(err);
};

const getTrackId = () => {
  const threadStorage = asyncLocalStorage.getStore();
  return threadStorage.get("trackId");
};

const createSystemErrorMessage = (error) => {
  const trackId = getTrackId();
  const messageTrackId = trackId.split("=")[1].slice(0, 10);
  return {
    message: "Something went wrong. " + messageTrackId,
    type: error.type,
  };
};

const getBuisnessErrorResponse = (error) => {
  let { displayMessage } = error;
  if (typeof displayMessage === "string")
    displayMessage = { message: displayMessage, type: error.type };

  return { ...displayMessage, type: error.type };
};

exports.knownErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SystemException) {
    const { status } = err;
    const message = createSystemErrorMessage(err);
    res.status(status).json({ message });
    return res;
  }
  if (err instanceof BuisnessException) {
    const response = getBuisnessErrorResponse(err);
    res.status(err.status).json(response);
    return res;
  }

  next(err);
};

exports.defaultErrorHandler = (err, req, res, next) => {
  logger.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({ message: "Somethnig went wrong" });
};
