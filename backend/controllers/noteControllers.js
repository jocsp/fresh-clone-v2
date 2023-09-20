const mongoose = require("mongoose");

const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");
const Activity = require("../models/activityModel");
const Agent = require("../models/agentModel");

const addNote = async (req, res) => {
  const { by, noteDate, content, ticket_number } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Note content is empty." });
  }

  try {
    const ticket = await Ticket.findOne({ ticket_number: ticket_number });
    const agent = await Agent.findById(by._id).lean();
    const createdNote = await Note.create({
      by: agent,
      noteDate,
      content,
      edited: false,
    });

    ticket.notes.push(createdNote);
    ticket.save();

    const activity = await Activity.create({
      type: "dashboard",
      color: agent.color,
      name: by.name,
      verb: "added",
      predicate: "a note to the ticket",
      ticket_name: ticket.subject,
      ticket_number: ticket_number,
      complement: null,
      date: noteDate,
    });

    await createdNote.populate("by");

    res.status(200).json(createdNote);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  const { content, note_id, editedBy } = req.body;

  try {
    await Note.updateOne(
      { _id: note_id },
      {
        content: content,
        edited: true,
        editedBy: editedBy,
        timeEdited: new Date(),
      }
    );
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { ticket_id, note_id } = req.body;

  try {
    await Note.deleteOne({ _id: note_id }).lean();

    await Ticket.findOneAndUpdate(
      { _id: ticket_id },
      { $pull: { notes: note_id } }
    ).lean();

    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }

  res.status(200).json();
};

module.exports = { addNote, deleteNote, updateNote };
