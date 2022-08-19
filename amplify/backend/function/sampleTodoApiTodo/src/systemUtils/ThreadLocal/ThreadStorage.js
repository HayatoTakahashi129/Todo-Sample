const { AsyncLocalStorage } = require("async_hooks");
const asyncLocalStorage = new AsyncLocalStorage();

const loggerMiddleware = (trackKey) => {
  return (req, res, next) => {
    const userId = req.userId;
    const trackId =
      req.headers[trackKey] || req.headers[trackKey.toLowerCase()];
    const time = new Date();

    const map = new Map();
    map.set("userId", userId);
    map.set("trackId", trackId);
    map.set("time", time);

    asyncLocalStorage.run(map, () => next());
  };
};

module.exports = { loggerMiddleware, asyncLocalStorage };
