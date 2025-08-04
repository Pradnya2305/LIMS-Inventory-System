const express = require('express');
const router = express.Router();
const {
  addComponent,
  getComponents,
  updateComponent
} = require('../controllers/componentController');

router.post('/', addComponent);
router.get('/', getComponents);
router.put('/:id', updateComponent);

module.exports = router;
