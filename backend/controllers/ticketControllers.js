const mongoose = require('mongoose');

const Ticket = require('../models/ticketModel');
const Agent = require('../models/agentModel');
const Activity = require('../models/activityModel');
const Contact = require('../models/contactModel');

const getTickets = async (req, res) => {
  const { filters } = req.query;

  const query = Ticket.find();

  query
    .sort({ _id: -1 })
    .populate('contact')
    .populate({ path: 'createdBy', select: '-password' })
    .populate({ path: 'agent', select: '-password' })
    .lean();

  if (filters?.agents) {
    const agents = await Agent.find({ name: filters.agents }, '_id').lean();
    const agentsIds = agents.map((agent) => agent._id);
    query.find({ agent: agentsIds });
  }

  if (filters?.group) {
    query.find({ group: filters.group });
  }

  if (filters?.status) {
    query.find({ status: filters.status });
  }

  if (filters?.priority) {
    query.find({ priority: filters.priority });
  }

  if (filters?.type) {
    query.find({ type: filters.type });
  }

  if (filters?.contacts) {
    const contacts = await Contact.find(
      { name: filters.contacts },
      '_id'
    ).lean();
    const contactsIds = contacts.map((contact) => contact._id);
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
      .populate({ path: 'notes', populate: { path: 'by', model: 'Agent' } })
      .populate('contact')
      .populate({ path: 'createdBy', select: '-password' })
      .populate({ path: 'agent', select: '-password' })
      .lean();

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

    console.log(contact);

    const activity = await Activity.create({
      type: 'dashboard',
      name: contact.name,
      color: contact.color,
      verb: 'created',
      predicate: 'a new ticket',
      ticket_name: data.subject,
      ticket_number: ticket.ticket_number,
      complement: null,
      date: data.date,
    });

    const agent = await Agent.updateOne(
      { _id: data.agent._id },
      { $push: { ticketsAssigned: ticket } }
    );

    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { newTicket, getTickets, getSingleTicket };
