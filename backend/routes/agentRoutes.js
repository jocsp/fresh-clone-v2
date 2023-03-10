const express = require("express");

const {
  signupAgent,
  loginAgent,
  initialAuthAgent,
} = require("../controllers/agentControllers");

const router = express.Router();

router.post("/login", loginAgent);

router.post("/signup", signupAgent);

router.post("/initial-auth", initialAuthAgent);

module.exports = router;
