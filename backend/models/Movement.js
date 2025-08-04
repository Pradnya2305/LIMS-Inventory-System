const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
  componentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component',
    required: true
  },
  type: {
    type: String,
    enum: ['inward', 'outward'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  reason: String,
  user: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });  // ⬅️ Important for analytics

module.exports = mongoose.model('Movement', movementSchema);
