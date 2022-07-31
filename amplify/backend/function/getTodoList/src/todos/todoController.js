const Router = require("express-promise-router");
const { getTodoList, addTodo } = require("./todosService");
const {
  validatorMiddleware,
} = require("../systemUtils/Validator/middleware/validateMiddleware");
const router = Router();

/********************************
 * HTTP Get method for list objects *
 ********************************/

router.get("/todos", async (req, res) => {
  // no need to validate.
  const todoList = await getTodoList();
  res.status(200);
  res.json(todoList);
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

router.post("/todo/add", validatorMiddleware(schema), async (req, res) => {
  const todo = req.body;
  await addTodo(todo);

  res.status(200);
  res.json({ message: "add new Todo completedly." });
});

module.exports = router;
