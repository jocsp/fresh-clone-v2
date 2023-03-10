const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: String,
  checked: Boolean,
});

module.exports = mongoose.model("Todo", todoSchema);
