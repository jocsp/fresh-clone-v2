const mongoose = require("mongoose");

const Ticket = require("../models/ticketModel");
const Agent = require("../models/agentModel");

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .sort({ _id: -1 })
      .populate("contact")
      .populate({ path: "createdBy", select: "-password" })
      .populate({ path: "agent", select: "-password" })
      .lean();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getSingleTicket = async (req, res) => {
  const { ticket_number } = req.params;

  try {
    const ticket = await Ticket.findOne({
      ticket_number: ticket_number,
    })
      .populate("notes")
      .populate("contact")
      .populate({ path: "createdBy", select: "-password" })
      .populate({ path: "agent", select: "-password" })
      .lean();

    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const newTicket = async (req, res) => {
  const data = req.body;

  console.log(data);

  try {
    const ticket = await Ticket.createTicket(data);

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
