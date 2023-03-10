const mognoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  subject: String,
  verb: String,
  predicate: String,
  ticket_name: String,
  ticket_number: Number,
  complement: String,
  date: Date,
});

module.exports = mongoose.model("Activity", activitySchema);
