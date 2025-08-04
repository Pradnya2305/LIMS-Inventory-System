const express = require('express');
const router = express.Router();
const { getUsageLast30Days } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/usage', authMiddleware, getUsageLast30Days);

module.exports = router;
