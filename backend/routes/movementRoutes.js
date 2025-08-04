const express = require('express');
const router = express.Router();
const { logInward, logOutward } = require('../controllers/movementController');
const auth = require('../middleware/authMiddleware');

router.post('/inward', auth, logInward);
router.post('/outward', auth, logOutward);

module.exports = router;
