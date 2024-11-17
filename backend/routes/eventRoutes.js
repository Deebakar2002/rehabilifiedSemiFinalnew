// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { getAllEvents, createEvent, getEventById } = require('../controllers/eventController');
const upload = require('../middleware/multer');

router.get('/events', getAllEvents);
router.post('/events', upload.single('profileImage'), createEvent);
router.get('/events/:id', getEventById); 

module.exports = router;
