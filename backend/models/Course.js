// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  resources: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true }, // URLs to resources
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
