const express = require("express");

const { newTicket, getTickets } = require("../controllers/ticketControllers");

const router = express.Router();

router.get("/get-tickets", getTickets);

router.post("/new-ticket", newTicket);

module.exports = router;
