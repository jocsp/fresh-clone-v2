const express = require("express");
const {
  getContact,
  getContacts,
  createContact,
} = require("../controllers/contactControllers");

const router = express.Router();

router.get("/:contactId", getContact);
router.post("/all", getContacts);
router.post("/create-contact", createContact);

module.exports = router;
