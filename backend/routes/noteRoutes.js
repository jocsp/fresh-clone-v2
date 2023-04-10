const express = require('express');

const { addNote, deleteNote } = require('../controllers/noteControllers');

const router = express.Router();

router.post('/add-note', addNote);
router.delete('/delete', deleteNote);

module.exports = router;
