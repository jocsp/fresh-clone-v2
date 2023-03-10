const express = require("express");

const { newTicket } = require("../controllers/ticketControllers");

const router = express.Router();

router.post("/new-ticket", newTicket);

module.exports = router;
