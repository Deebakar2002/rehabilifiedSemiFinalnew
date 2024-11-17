// controllers/adminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin login logic
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

    // Respond with the token and admin details
    res.status(200).json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error logging in admin:', error.message);
    res.status(500).json({ message: 'Server error, please try again' });
  }
};

// Admin dashboard logic (protected route)
const getAdminDashboard = async (req, res) => {
  try {
    // Assuming req.admin is populated by the protectAdmin middleware
    res.status(200).json({
      message: `Welcome, Admin ${req.admin.email}!`,
      data: {
        id: req.admin._id,
        email: req.admin.email,
        // Add other admin data if needed
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard:', error.message);
    res.status(500).json({ message: 'Server error, please try again' });
  }
};

module.exports = { loginAdmin, getAdminDashboard };