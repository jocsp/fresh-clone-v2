const mongoose = require("mongoose");

const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

const addNote = async (req, res) => {
  const { by, noteDate, content, ticket_number } = req.body;

  try {
    const ticket = await Ticket.findOne({ ticket_number: ticket_number });

    const createdNote = await Note.create({
      by,
      noteDate,
      content,
      edited: false,
    });

    ticket.notes.push(createdNote);
    ticket.save();

    res.status(200).json(createdNote);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addNote };
