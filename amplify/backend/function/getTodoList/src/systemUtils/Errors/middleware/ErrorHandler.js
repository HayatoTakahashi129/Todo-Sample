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

const createSystemErrorMessage = () => {
  const trackId = getTrackId();
  const messageTrackId = trackId.split("=")[1].slice(0, 10);
  return "Something went wrong. " + messageTrackId;
};

const getBuisnessErrorResponse = (error) => {
  let { displayMessage, status } = error;
  if (typeof displayMessage === "string")
    displayMessage = { message: displayMessage };

  return { message: displayMessage, status };
};

exports.knownErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SystemException) {
    logger.error(err);
    const { status } = err;
    const message = createSystemErrorMessage();
    res.status(status).json({ message });
    return res;
  }
  if (err instanceof BuisnessException) {
    logger.info(err);
    const response = getBuisnessErrorResponse(err);
    res.status(response.status).json(response.message);
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
