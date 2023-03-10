const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Status", statusSchema);
