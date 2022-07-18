const { SystemException } = require("../../systemUtils/Errors/Exceptions");
const {
  asyncLocalStorage,
} = require("../../systemUtils/ThreadLocal/ThreadStorage");

const getUser = () => {
  const storage = asyncLocalStorage.getStore();
  const userId = storage.get("userId");
  if (!userId) {
    throw new SystemException(500, "Can't get user from threadLocal.");
  }
  return userId;
};

module.exports = getUser;
