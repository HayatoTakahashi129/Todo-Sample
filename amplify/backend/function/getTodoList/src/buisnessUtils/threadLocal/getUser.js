const { SystemException } = require("../../systemUtils/Errors/Exceptions");
const logger = require("../../systemUtils/Logger/Logger");
const {
  asyncLocalStorage,
} = require("../../systemUtils/ThreadLocal/ThreadStorage");

const getUser = () => {
  const storage = asyncLocalStorage.getStore();
  const userId = storage?.get("userId");
  if (!userId) {
    throw new SystemException(500, null, "Can't get user from threadLocal.");
  }
  logger.debug("get user: ", userId);
  return userId;
};

module.exports = getUser;
