const mongoose = require('mongoose');
const Agent = require('../models/agentModel');
const Todo = require('../models/todoModel');

const getTodos = async (req, res) => {
  const { _id } = req.body;

  try {
    const agent = await Agent.findById(_id).populate('todos').lean();
    res.status(200).json(agent.todos);
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
};

const addTodo = async (req, res) => {
  const { todo, _id } = req.body;

  try {
    if (!todo) {
      throw Error('Todo input was empty');
    }

    const agent = await Agent.findOne({ _id: _id });

    const newTodo = await Todo.create({
      todo: todo,
      checked: false,
    });

    agent.todos.push(newTodo);

    agent.save();

    res.status(200).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changeTodo = async (req, res) => {
  const { todo_id, checked } = req.body;

  try {
    const todo = await Todo.findOneAndUpdate({ _id: todo_id }, { checked });
    res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { todo_id } = req.body;

  try {
    await Todo.deleteOne({ _id: todo_id });
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addTodo, getTodos, changeTodo, deleteTodo };
