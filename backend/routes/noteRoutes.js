const express = require("express");

const { addNote } = require("../controllers/noteControllers");

const router = express.Router();

router.post("/add-note", addNote);

module.exports = router;
