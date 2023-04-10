const Activity = require('../models/activityModel');

const getAll = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ _id: -1 }).lean();

    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAll };
