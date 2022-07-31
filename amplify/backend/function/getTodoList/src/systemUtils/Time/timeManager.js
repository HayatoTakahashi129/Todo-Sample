const { formatToTimeZone } = require("date-fns-timezone");
const { BuisnessException } = require("../Errors/Exceptions");
const { asyncLocalStorage } = require("../ThreadLocal/ThreadStorage");
const TIME_ZONE = "Asia/Tokyo";
const TIMESTAMP_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSZ";

const getTime = () => {
  const contextStore = asyncLocalStorage.getStore();
  if (!contextStore)
    throw new BuisnessException(500, null, "Can't get Thread Local.");
  const time = contextStore.get("time");

  return time;
};

exports.getTimestamp = () => {
  const time = getTime();
  const currentTimestamp = formatToTimeZone(time, TIMESTAMP_FORMAT, {
    timeZone: TIME_ZONE,
  });
  return currentTimestamp;
};

exports.getTime = () => {
  const time = getTime();
  return time;
};
