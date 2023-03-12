const mongoose = require("mongoose");

const Ticket = require("../models/ticketModel");

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).lean();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const newTicket = async (req, res) => {
  const data = req.body;

  try {
    const ticket = await Ticket.createTicket(data).lean();
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { newTicket, getTickets };
