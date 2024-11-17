const Purchase = require('../models/Purchase'); // Assuming you have a Purchase model
const StudentAuth = require('../models/StudentAuth'); // To retrieve student details
const Course = require('../models/Course'); // Assuming purchases are related to courses

// Handler for creating a new purchase
const purchaseHandler = async (req, res) => {
  try {
    const { courseId, quantity } = req.body; // Destructure required fields from request body

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create a new purchase
    const purchase = new Purchase({
      studentId: req.student._id, // Get student ID from the protected route
      courseId: course._id,
      quantity,
      totalAmount: course.price * quantity, // Calculate total amount based on course price
      purchaseDate: new Date(), // Store the purchase date
    });

    // Save the purchase to the database
    await purchase.save();

    // Respond with the purchase details
    res.status(201).json({ message: 'Purchase successful', purchase });
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { purchaseHandler };
