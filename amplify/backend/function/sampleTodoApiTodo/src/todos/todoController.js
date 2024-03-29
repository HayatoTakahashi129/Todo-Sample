const Router = require("express-promise-router");
const { getTodoList, addTodo } = require("./todosService");
const {
  validatorMiddleware,
} = require("../systemUtils/Validator/middleware/validateMiddleware");
const router = Router();

/********************************
 * HTTP Get method for list objects *
 ********************************/

router.get("/todo", async (req, res) => {
  // no need to validate.
  const todoList = await getTodoList();
  res.status(200);
  res.json({ message: "api execution succeed.", result: todoList });
});

const schema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 120 },
    dueDate: { type: "string", format: "date-time" },
    description: { type: "string", maxLength: 1024 },
  },
  required: ["title", "dueDate"],
};

router.post("/todo", validatorMiddleware(schema), async (req, res) => {
  const todo = req.body;
  const result = await addTodo(todo);

  res.status(200);
  res.json({ message: "add new Todo completedly.", result });
});

module.exports = router;
