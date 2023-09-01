const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  color: String,
  email: String,
  number: String,
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
});

module.exports = mongoose.model("Contact", contactSchema);
