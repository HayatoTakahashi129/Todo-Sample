const { insert } = require("../../buisnessUtils/database/database");
const {
  generateRandomTimeId,
} = require("../../systemUtils/RandomGenerator/random");
const getUser = require("../../buisnessUtils/threadLocal/getUser");
const logger = require("../../systemUtils/Logger/Logger");

const TABLE = "todos";

exports.addTodo = async (todo) => {
  const { title, description, dueDate } = todo;
  const userId = getUser();
  const id = generateRandomTimeId();

  const values = {
    userId,
    id,
    title,
    description,
    dueDate,
  };

  logger.debug("start insert todo", values);
  const result = await insert(TABLE, values);
  return result;
};
