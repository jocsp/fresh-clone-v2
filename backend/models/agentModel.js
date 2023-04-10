const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  color: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
  ticketsAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
});

agentSchema.statics.signup = async function (name, email, username, password) {
  // Random colors for the profile icons
  const randomColors = [
    '#4AB3A4',
    '#548999',
    '#ED9611',
    '#E1D1F0',
    '#C9A587',
    '#E6CD4C',
    '#E3AF9B',
    '#dbd6f5',
    '#d1e4ff',
    '#ffd8c2',
    '#cfe3fe',
  ];
  // validation

  if (!name || !email || !username || !password) {
    throw Error('All fields must be filled');
  }

  const existsEmail = await this.findOne({ email }).lean();
  const existsUsername = await this.findOne({ username }).lean();

  if (existsEmail) {
    throw Error('Email is already in use');
  }

  if (existsUsername) {
    throw Error('Username is already in use');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // selecting the color

  const randomIndex = Math.floor(Math.random() * randomColors.length);

  const agent = await this.create({
    name,
    email,
    color: randomColors[randomIndex],
    username,
    password: hashedPassword,
  });

  return agent;
};

agentSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error('All fields must be filled');
  }

  const agent = await this.findOne({ username })
    .populate({ path: 'ticketsAssigned', select: '_id status' })
    .populate('todos')
    .lean();

  if (!agent) {
    throw Error('Incorrect username or password');
  }

  const match = await bcrypt.compare(password, agent.password);

  if (!match) {
    throw Error('Incorrect username or password');
  }

  return agent;
};

module.exports = mongoose.model('Agent', agentSchema);
