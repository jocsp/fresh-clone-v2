const express = require("express");
const {
  addTodo,
  getTodos,
  changeTodo,
} = require("../controllers/todoControllers");

const router = express.Router();

router.get("/get-todos", getTodos);
router.post("/add-todo", addTodo);
router.post("/change-todo", changeTodo);

module.exports = router;
