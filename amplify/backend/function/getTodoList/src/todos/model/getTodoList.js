const { selectDB } = require("../../systemUtils/Database/dynamo");
const getUser = require("../../buisnessUtils/threadLocal/getUser");

const TABLE = "todos";

exports.getTodoList = async () => {
  const userId = getUser();

  const select = ["id", "title", "dueDate", "description"];
  const where = { userId };

  const result = await selectDB(TABLE, select, where);
  return result;
};
