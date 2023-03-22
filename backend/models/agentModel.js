const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  ticketsAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }],
});

agentSchema.statics.signup = async function (name, email, username, password) {
  // validation

  if (!name || !email || !username || !password) {
    throw Error("All fields must be filled");
  }

  const existsEmail = await this.findOne({ email }).lean();
  const existsUsername = await this.findOne({ username }).lean();

  if (existsEmail) {
    throw Error("Email is already in use");
  }

  if (existsUsername) {
    throw Error("Username is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const agent = await this.create({
    name,
    email,
    username,
    password: hashedPassword,
  });

  return agent;
};

agentSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const agent = await this.findOne({ username })
    .populate({ path: "ticketsAssigned", select: "_id status" })
    .populate("todos")
    .lean();

  if (!agent) {
    throw Error("Incorrect username or password");
  }

  const match = await bcrypt.compare(password, agent.password);

  if (!match) {
    throw Error("Incorrect username or password");
  }

  return agent;
};

module.exports = mongoose.model("Agent", agentSchema);
