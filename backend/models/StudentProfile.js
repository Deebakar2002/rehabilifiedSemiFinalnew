const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentAuth', // Links to the StudentAuth model
    required: true,
    unique: true // Ensure each student has one profile
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure the email is unique for each student
  },
  fullName: {
    type: String,
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String,
    default: ''
  },
  profession: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
   
  },
  bio: {
    type: String,
    default: ''
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course' // Reference to Course model
    }
  ],
  notes: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true } // URLs or paths to notes
    }
  ],
  videos: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true } // URLs to videos
    }
  ],
  meetingLink: {
    type: String,
    default: ''
  },
  meetingDate: {
    type: Date,
    default: null
  },
  meetingTime: {
    type: String,
    default: ''
    
  },
  feedbacks: [
    {
      feedback: { type: String, default: '' }, // Feedback message
      submittedAt: { type: Date, default: Date.now } // Timestamp of submission
    }
  ]
}, { timestamps: true });

// Pre-save hook to automatically populate the email field from the StudentAuth model
studentProfileSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const studentAuth = await mongoose.model('StudentAuth').findById(this.studentId);
      if (studentAuth) {
        this.email = studentAuth.email; // Assign email from StudentAuth
      }
    } catch (error) {
      return next(error); // Pass any errors to the next middleware
    }
  }
  next();
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
module.exports = StudentProfile;
