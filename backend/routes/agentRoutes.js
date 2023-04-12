const express = require('express');

const {
  signupAgent,
  loginAgent,
  initialAuthAgent,
  logoutAgent,
} = require('../controllers/agentControllers');

const router = express.Router();

router.post('/login', loginAgent);

router.post('/signup', signupAgent);

router.get('/logout', logoutAgent);

router.post('/initial-auth', initialAuthAgent);

module.exports = router;
