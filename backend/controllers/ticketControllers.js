const mongoose = require("mongoose");

const Ticket = require("../models/ticketModel");
const Agent = require("../models/agentModel");
const Activity = require("../models/activityModel");
const Contact = require("../models/contactModel");

const getTickets = async (req, res) => {
  const { filters } = req.query;

  const query = Ticket.find();

  query
    .sort({ _id: -1 })
    .populate("status")
    .populate("type")
    .populate("group")
    .populate("contact")
    .populate("priority")
    .populate({ path: "createdBy", select: "-password" })
    .populate({ path: "agent", select: "-password" })
    .lean();

  if (filters?.agents) {
    const agentsIds = filters.agents.map((agent) => agent._id);
    query.find({ agent: agentsIds });
  }

  if (filters?.group) {
    const groupIds = filters.group.map((group) => group._id);
    query.find({ group: groupIds });
  }

  if (filters?.status) {
    const statusIds = filters.status.map((status) => status._id);
    query.find({ status: statusIds });
  }

  if (filters?.priority) {
    const priorityIds = filters.priority.map((priority) => priority._id);
    query.find({ priority: priorityIds });
  }

  if (filters?.type) {
    const typeIds = filters.type.map((type) => type._id);
    query.find({ type: typeIds });
  }

  if (filters?.contacts) {
    const contactsIds = filters.contacts.map((contact) => contact._id);
    query.find({ contact: contactsIds });
  }

  try {
    const tickets = await query.exec();
    res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

const getSingleTicket = async (req, res) => {
  const { ticket_number } = req.params;

  try {
    const ticket = await Ticket.findOne({
      ticket_number: ticket_number,
    })
      .populate({ path: "notes", populate: { path: "by", model: "Agent" } })
      .populate({
        path: "contact",
        populate: {
          path: "tickets",
          model: "Ticket",
          select: "_id subject status date ticket_number date",
          populate: { path: "status" },
        },
      })
      .populate("status")
      .populate("priority")
      .populate("group")
      .populate("type")
      .populate({ path: "createdBy", select: "-password" })
      .populate({ path: "agent", select: "-password" })
      .lean();

    ticket.contact.tickets.reverse();

    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const newTicket = async (req, res) => {
  const data = req.body;

  try {
    const ticket = await Ticket.createTicket(data);
    const contact = await Contact.findById(ticket.contact._id);

    const activity = await Activity.create({
      type: "dashboard",
      name: contact.name,
      color: contact.color,
      verb: "created",
      predicate: "a new ticket",
      ticket_name: data.subject,
      ticket_number: ticket.ticket_number,
      complement: null,
      date: data.date,
    });

    const agent = await Agent.updateOne(
      { _id: data.agent._id },
      { $push: { ticketsAssigned: ticket } }
    );

    contact.tickets.push(ticket);

    await contact.save();

    await ticket.populate("status");

    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const updateTicket = async (req, res) => {
  // _id is the id of the agent that made the request
  const { data, ticket_id, _id } = req.body;

  // finds ticket with the id provided (ticket_id), changes some fields and
  // returns the new updated document
  const updatedTicket = await Ticket.findOneAndUpdate(
    { _id: ticket_id },
    data,
    {
      new: true,
    }
  )
    .populate("status")
    .lean();

  const agent = await Agent.findById(_id).select("name color").lean();

  await Activity.createPropActivities(agent, updatedTicket, data);

  res.status(200).json(updatedTicket);
};

module.exports = {
  newTicket,
  getTickets,
  getSingleTicket,
  updateTicket,
};
