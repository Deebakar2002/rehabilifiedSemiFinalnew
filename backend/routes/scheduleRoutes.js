// routes/scheduleRoutes.js
const express = require('express');
const {getScheduleDetails } = require('../controllers/scheduleController');
const { protectStudent } = require('../middleware/authMiddleware');
const router = express.Router();


// Route to get meeting details by student ID
router.get('/:studentId', protectStudent, getScheduleDetails);

module.exports = router;
