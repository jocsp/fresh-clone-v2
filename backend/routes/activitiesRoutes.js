const express = require('express');
const { getAll } = require('../controllers/activitiesController');

const router = express.Router();

router.get('/get-all', getAll);

module.exports = router;
