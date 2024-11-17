const express = require('express');
const multer = require('multer');
const { protectStudent, protectAdmin } = require('../middleware/authMiddleware');
const {
  registerStudent,
  loginStudent,
  getStudentDashboard,
  updateProfile,
  getCourses,
  getResources,
  getAllStudents,
  getStudentById,
  addFeedback,
} = require('../controllers/studentController');

const router = express.Router();

// Set up storage engine for multer (to handle profile photo uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// ========== AUTHENTICATION ROUTES ==========

router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Route to add feedback
router.post('/add-feedback', addFeedback);

// ========== PROTECTED ROUTES ==========

router.get('/all', protectAdmin, getAllStudents);

router.use(protectStudent); // Protect all routes below

router.get('/dashboard', getStudentDashboard);
router.put('/profile/:id', upload.single('profilePicture'), updateProfile);
router.get('/courses', getCourses);
router.get('/resources', getResources);

// ========== ADMIN ROUTES ==========

// Ensure these routes are protected for admin use only


module.exports = router;
