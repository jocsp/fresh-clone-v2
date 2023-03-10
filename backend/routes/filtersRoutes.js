const express = require("express");

const getFilters = require("../controllers/filtersControllers");

const router = express.Router();

router.get("/get-filters", getFilters);

module.exports = router;
