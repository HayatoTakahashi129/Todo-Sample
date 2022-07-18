const { getTodoList } = require("./model/getTodoList");

exports.getTodoList = async () => {
  return await getTodoList();
};
