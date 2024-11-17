// adminAccessRoutes.js
const express = require('express');
const {
  getStudentById,
  sendMeetingLink,
  getEventRegistrations,
  uploadNotesAndVideosUser,
} = require('../controllers/adminAccessController'); // Adjust path as needed
const { protectAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

const multer = require('multer');
const path = require('path');


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Store files in an 'uploads' directory
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
// Route to get student details by ID
router.get('/studentDetail/:id', protectAdmin, getStudentById);

router.get('/studentEventRegistrations/:id', protectAdmin, getEventRegistrations);

// Route to send meeting link
router.post('/sendMeetingLink', protectAdmin, sendMeetingLink);

router.post('/uploadNotesAndVideos', protectAdmin, upload.fields([{ name: 'notes' }, { name: 'video' }]), uploadNotesAndVideosUser);

module.exports = router;
