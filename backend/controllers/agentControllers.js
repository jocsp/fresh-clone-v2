const mongoose = require('mongoose');
const Agent = require('../models/agentModel');
const jwt = require('jsonwebtoken');

// calculating seconds of a specific amount of days.
const maxAge = 3 * 24 * 60 * 60;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const initialAuthAgent = async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(200)
      .json({ error: 'Authorization token not present', authorized: false });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    let agent = await Agent.findOne({ _id })
      .populate({ path: 'ticketsAssigned', select: '_id status' })
      .populate('todos')
      .lean();

    delete agent.password;

    res.status(200).json({ agent, authorized: true });
  } catch (error) {
    res.status(200).json({
      error: 'Error finding user with the token given',
      authorized: false,
    });
  }
};

const loginAgent = async (req, res) => {
  const { username, password } = req.body;

  try {
    let agent = await Agent.login(username, password);

    const token = createToken(agent._id);

    res.cookie('jwt', token, { maxAge: maxAge * 1000 });

    delete agent.password;

    res.status(200).json({ ...agent });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const signupAgent = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    let agent = await Agent.signup(name, email, username, password);

    const token = createToken(agent._id);

    res.cookie('jwt', token, { maxAge: maxAge * 1000 });

    delete agent.password;

    res.status(200).json({ agent });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const logoutAgent = (req, res) => {
  res.clearCookie('jwt', { expires: 0 });

  res.status(200).json({ loggedOut: true });
};

module.exports = { loginAgent, signupAgent, initialAuthAgent, logoutAgent };
