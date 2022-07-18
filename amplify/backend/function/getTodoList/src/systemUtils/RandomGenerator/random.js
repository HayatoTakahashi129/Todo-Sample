const { formatToTimeZone } = require("date-fns-timezone");
const STRING_FORMAT = "T"; // millisecond format
const TIME_ZONE = "Asia/Tokyo";

exports.generateRandomNumberStr = (n) => {
  var CODE_TABLE = "0123456789";
  var r = "";
  for (var i = 0, k = CODE_TABLE.length; i < n; i++) {
    r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
  }
  return r;
};

exports.generateRandomId = (n) => {
  var CODE_TABLE =
    "0123456789" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";
  var r = "";
  for (var i = 0, k = CODE_TABLE.length; i < n; i++) {
    r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
  }
  return r;
};

exports.generateRandomTimeId = () => {
  const randomId = this.generateRandomNumberStr(20);
  const now = new Date();
  const timestampString = formatToTimeZone(now, STRING_FORMAT, {
    timeZone: TIME_ZONE,
  });
  return timestampString + randomId;
};
