// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  maxDuration: { type: Number },  // Maximum duration in hours/days
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  actualPrice: { type: Number, required: true },
  discountedPrice: { type: Number },
  profileImage: { type: String },
  studentPurchased: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile' // Links to the StudentProfile model
    }
  ]
}, { timestamps: true });

// Optional: Calculate discountedPrice if not provided
eventSchema.pre('save', function (next) {
  if (!this.discountedPrice && this.actualPrice) {
    this.discountedPrice = this.actualPrice; // Default to actualPrice if no discount is given
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
