const express = require('express');
const { purchaseHandler } = require('../controllers/purchaseController'); // Adjust based on your actual import
const { protectStudent } = require('../middleware/authMiddleware');

const router = express.Router();

// Define the purchase route
router.post('/', protectStudent, purchaseHandler); // Ensure this matches the intended handler

module.exports = router;
