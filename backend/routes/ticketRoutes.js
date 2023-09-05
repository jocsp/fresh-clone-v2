const express = require("express");

const {
  newTicket,
  getTickets,
  getSingleTicket,
  updateTicket,
} = require("../controllers/ticketControllers");

const router = express.Router();

router.get("/get-tickets", getTickets);
router.get("/single-ticket/:ticket_number", getSingleTicket);

router.post("/new-ticket", newTicket);

router.patch("/update", updateTicket);

module.exports = router;
