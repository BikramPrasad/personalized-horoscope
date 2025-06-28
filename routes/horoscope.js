const express = require('express');
const router = express.Router();
const horoscopeController = require('../controller/horoscopeController');
const rateLimiter = require('../middleware/rateLimiter');

const { authenticateUser } = require('../middleware/auth');

router.get('/horoscope/today', rateLimiter, authenticateUser, horoscopeController.today);
router.get('/horoscope/history', rateLimiter, authenticateUser, horoscopeController.history);

module.exports = router;
