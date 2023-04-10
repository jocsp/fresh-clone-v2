const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: String,
  color: String,
  name: String,
  verb: String,
  predicate: String,
  ticket_name: String,
  ticket_number: Number,
  complement: String,
  date: Date,
});

module.exports = mongoose.model('Activity', activitySchema);
