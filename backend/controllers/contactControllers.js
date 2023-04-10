const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
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

  const { name, email, number } = req.body;

  try {
    const randomIndex = Math.floor(Math.random() * randomColors.length);

    const contact = await Contact.create({
      name,
      color: randomColors[randomIndex],
      email,
      number,
    });
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createContact };
