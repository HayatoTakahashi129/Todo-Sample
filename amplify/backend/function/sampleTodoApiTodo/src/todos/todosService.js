const { getTodoList } = require("./model/getTodoList");
const { addTodo } = require("./model/addTodo");
const { SystemException } = require("../systemUtils/Errors/Exceptions");

exports.getTodoList = async () => {
  try {
    return await getTodoList();
  } catch (error) {
    throw new SystemException(500, error, "Fialed to get Todo list");
  }
};

exports.addTodo = async (todo) => {
  try {
    const insert_values = await addTodo(todo);
    return insert_values;
  } catch (error) {
    throw new SystemException(500, error, ["Failed to insert todo", todo]);
  }
};
