const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  by: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  content: String,
  noteDate: Date,
  edited: Boolean,
  editedBy: String,
  timeEdited: Date,
});

module.exports = mongoose.model('Note', noteSchema);
