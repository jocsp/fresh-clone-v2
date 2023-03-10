const mongoose = require("mongoose");

const Contact = require("../models/contactModel");
const Type = require("../models/typeModel");
const Status = require("../models/statusModel");
const Priority = require("../models/priorityModel");
const Group = require("../models/groupModel");
const Agent = require("../models/agentModel");

const getFilters = async (req, res) => {
  try {
    const contacts = await Contact.find({}, "_id name").lean();
    const types = await Type.find({}, "_id name").lean();
    const status = await Status.find({}, "_id name").lean();
    const priorities = await Priority.find({}, "_id name").lean();
    const groups = await Group.find({}, "_id name").lean();
    const agents = await Agent.find({}, "_id name").lean();

    res
      .status(200)
      .send({ contacts, types, status, priorities, groups, agents });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = getFilters;
