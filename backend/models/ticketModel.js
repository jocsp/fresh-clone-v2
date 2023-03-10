const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  contact: String,
  subject: String,
  type: String,
  status: String,
  priority: String,
  group: String,
  agent: String,
  description: String,
  ticket_number: Number,
  date: Date,
  createdBy: String,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
});

ticketSchema.statics.createTicket = async function (data) {
  // validation
  const isEmpty = Object.values(data).some((x) => x === null || x === "");

  if (isEmpty) {
    throw Error("All fields must be filled");
  }

  const ticket = await this.create(data);

  return ticket;
};

module.exports = mongoose.model("Ticket", ticketSchema);
