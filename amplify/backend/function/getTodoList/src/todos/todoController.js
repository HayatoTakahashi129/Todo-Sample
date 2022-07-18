const Router = require("express-promise-router");
const { getTodoList } = require("./todosService");
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

module.exports = router;
