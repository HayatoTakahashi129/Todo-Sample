const { formatToTimeZone } = require("date-fns-timezone");
const { asyncLocalStorage } = require("../ThreadLocal/ThreadStorage");
const TIME_ZONE = "Asia/Tokyo";
const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ssXXX";

class TimeMangaer {
  constructor() {
    const contextStore = asyncLocalStorage.getStore();
    this.time = contextStore.get("time");
    this.currentTimestamp = formatToTimeZone(this.time, TIMESTAMP_FORMAT, {
      timeZone: TIME_ZONE,
    });
  }

  get timestamp() {
    return this.currentTimestamp;
  }

  get time() {
    return this.time;
  }
}

module.exports = TimeMangaer;
