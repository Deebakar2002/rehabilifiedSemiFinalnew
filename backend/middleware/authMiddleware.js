// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const StudentAuth = require('../models/StudentAuth');


const protectAdmin = async (req, res, next) => {
  console.log('protectAdmin middleware accessed');
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:');

      const decoded = jwt.verify(token, "your_jwt_secret_key_here_make_it_at_least_32_chars_long");
      console.log('Decoded token:');

      req.admin = await Admin.findById(decoded.id).select('-password');
      console.log('Admin found:');

      if (!req.admin) {
        throw new Error('No admin found with this ID');
      }

      next();
    } catch (error) {
      console.error('Error in protectAdmin middleware:', error);
      res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
    }
  }

  if (!token) {
    console.error('No token provided');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


const adminAccess = (req, res, next) => {
  let token;

  // Check for a token in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract the token

      // Verify the token
      jwt.verify(token, "your_jwt_secret_key_here_make_it_at_least_32_chars_long");

      // If token is valid, proceed to the next middleware or controller
      next();
    } catch (error) {
      console.error('Error in adminAccess middleware:', error);
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectStudent = async (req, res, next) => {
  console.log('protectStudent middleware accessed'); // Log for debugging
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, "your_jwt_secret_key_here_make_it_at_least_32_chars_long");

      // Find the student by ID
      req.student = await StudentAuth.findById(decoded.id).select('-password');
      if (!req.student) {
        return res.status(401).json({ message: 'Not authorized, student not found' });
      }

      next();
    } catch (error) {
      console.error('Error in protectStudent middleware:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if a student is an admin (optional, if required)
// const checkIfAdmin = async (req, res, next) => {
//   try {
//     // Assuming that `isAdmin` is a field in the `StudentAuth` model
//     if (req.student && req.student.isAdmin) {
//       next();
//     } else {
//       res.status(403).json({ message: 'Access denied, you must be an admin' });
//     }
//   } catch (error) {
//     console.error('Authorization error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

module.exports = { protectAdmin, protectStudent,adminAccess };