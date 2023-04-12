const express = require('express');

const {
  addNote,
  deleteNote,
  updateNote,
} = require('../controllers/noteControllers');

const router = express.Router();

router.post('/add-note', addNote);
router.post('/update', updateNote);
router.delete('/delete', deleteNote);

module.exports = router;
