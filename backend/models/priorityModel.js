const mongoose = require("mongoose");

const prioritySchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Priority", prioritySchema);
