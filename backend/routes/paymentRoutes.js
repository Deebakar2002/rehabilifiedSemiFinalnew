const express = require('express');
const EventRegistration = require('../models/EventRegistration');
const router = express.Router();

// Define the helper function
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

router.post('/', async (req, res) => {
  const { eventId, selectedDays, totalAmount } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  
  try {
    if (!token) {
      return res.status(401).json({ success: false, message: "Authorization token is missing." });
    }

    const decodedToken = decodeJWT(token);
    if (!decodedToken) {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }

    const studentId = decodedToken.id;

    const registration = new EventRegistration({
      student: studentId,
      event: eventId,
      selectedDays,
      totalAmount,
      paymentStatus: 'Completed'
    });

    await registration.save();
    res.status(200).json({ success: true, studentName: "Student Name" });
    console.log("registration details: ", registration);
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ success: false, message: "Payment processing failed." });
  }
});

module.exports = router;
