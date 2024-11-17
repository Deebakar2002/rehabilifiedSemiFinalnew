// models/EventRegistration.js
const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile', // Links to StudentProfile
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Links to Event
    required: true
  },
  selectedDays: {
    type: [String], // Stores the specific days chosen for this event
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'], // Track payment status
    default: 'Pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Ensure a unique registration per student-event pair
eventRegistrationSchema.index({ student: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
