const mongoose = require("mongoose");

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

// createActivity is only for the activities created
// when properties are changed

activitySchema.statics.createPropActivities = async function (
  agent,
  ticket,
  properties
) {
  if (properties?.agent) {
    const activityAgent = await this.create({
      type: "dashboard",
      color: agent.color,
      name: agent.name,
      verb: "assigned",
      predicate: "the ticket",
      ticket_name: ticket.subject,
      ticket_number: ticket.ticket_number,
      complement: properties.agent.name,
      date: new Date(),
    });

    delete properties.agent;
  }

  for (const key in properties) {
    const activity = await this.create({
      type: "dashboard",
      color: agent.color,
      name: agent.name,
      verb: "updated",
      predicate: "the " + key + " of ticket",
      ticket_name: ticket.subject,
      ticket_number: ticket.ticket_number,
      complement: properties[key].name,
      date: new Date(),
    });
  }
};

module.exports = mongoose.model("Activity", activitySchema);
