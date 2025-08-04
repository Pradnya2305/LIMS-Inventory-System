const express = require('express');
const router = express.Router();
const {
  getLowStockAlerts,
  getOldStockAlerts
} = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect both routes
router.get('/low-stock', authMiddleware, getLowStockAlerts);
router.get('/old-stock', authMiddleware, getOldStockAlerts);

module.exports = router;
