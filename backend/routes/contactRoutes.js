const express = require("express");
const {
  getContact,
  getContacts,
  createContact,
} = require("../controllers/contactControllers");

const router = express.Router();

router.get("/single/:contactId", getContact);
router.get("/all", getContacts);
router.post("/create-contact", createContact);

module.exports = router;
