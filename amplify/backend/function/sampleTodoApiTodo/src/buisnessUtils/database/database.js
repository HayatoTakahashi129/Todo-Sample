const { getTimestamp } = require("../../systemUtils/Time/timeManager");
const dynamo = require("../../systemUtils/Database/dynamo");

const addTimestamps = (params) => {
  let returnParams = addCreatedAt(params);
  returnParams = addUpdatedAt(returnParams);
  return returnParams;
};

const addCreatedAt = (params) => {
  const time = getTimestamp();
  return { ...params, createdAt: time };
};

const addUpdatedAt = (params) => {
  const time = getTimestamp();
  return { ...params, updatedAt: time };
};

exports.insert = async (table, values) => {
  const newValues = addTimestamps(values);
  const result = await dynamo.insert(table, newValues);
  return result;
};
