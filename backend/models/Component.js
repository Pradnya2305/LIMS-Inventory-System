const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  name: {  // This is displayed in dropdown, chart, etc.
    type: String,
    required: true
  },
  manufacturer: {
    type: String
  },
  partNumber: {
    type: String
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  location: {
    type: String
  },
  unitPrice: {
    type: Number
  },
  criticalLowThreshold: {
    type: Number,
    default: 0
  },
  lastUsedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Component', componentSchema);
