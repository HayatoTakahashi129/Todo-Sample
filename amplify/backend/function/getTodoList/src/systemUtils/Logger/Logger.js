const { asyncLocalStorage } = require("../ThreadLocal/ThreadStorage");

const log4js = require("log4js");

const getThreadLocal = () => {
  const contextStore = asyncLocalStorage.getStore();

  const userId = contextStore.get("userId");
  const trackId = contextStore.get("trackId");
  return { userId, trackId };
};

const changeLogEvent = (logEvent) => {
  delete logEvent.categoryName;
  delete logEvent.context;
  delete logEvent.pid;
  logEvent.level = logEvent.level.levelStr;
};

const createLogMessages = (logEvent) => {
  const beforeStack = logEvent.callStack;
  delete logEvent.callStack; // delete for display order.
  let stack = undefined;
  logEvent.messages = logEvent.data.map((data) => {
    if (data instanceof Error) {
      stack = data.stack;
      return data.message;
    }
    return data;
  });
  logEvent.callStack = stack?.split("\n");
  if (["WARN", "ERROR"].includes(logEvent.level))
    logEvent.callStack = logEvent.callStack ?? beforeStack?.split("\n");
  delete logEvent.data;
};

log4js.addLayout("json-info", function (config) {
  return function (logEvent) {
    const { userId, trackId } = getThreadLocal();
    logEvent.userId = userId;
    logEvent.trackId = trackId;

    changeLogEvent(logEvent);
    createLogMessages(logEvent);

    return JSON.stringify(logEvent);
  };
});

log4js.configure({
  appenders: {
    info: {
      type: "stdout",
      layout: {
        type: "json-info",
      },
    },
  },

  categories: {
    default: {
      appenders: ["info"],
      level: "all",
      enableCallStack: true,
    },
  },
});

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

module.exports = logger;
