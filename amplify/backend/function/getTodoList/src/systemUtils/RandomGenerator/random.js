const logger = require("../Logger/Logger");

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
  const randomId = this.generateRandomNumberStr(17);
  const now = new Date();
  const timestampString = String(now.getTime());
  const timeId = timestampString + randomId;

  logger.debug("generated random time id :", timeId);
  return timeId;
};
