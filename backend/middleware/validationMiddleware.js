// middleware/validationMiddleware.js

const { body, validationResult } = require('express-validator');
const AppError = require('../utils/appError');

exports.validateAdmin = (method) => {
  switch (method) {
    case 'login': {
      return [
        body('email', 'Please enter a valid email').exists().isEmail(),
        body('password', 'Password is required').exists()
      ];
    }
    case 'updateProfile': {
      return [
        body('fullName', 'Full name is required').optional().trim().isLength({ min: 2 }),
        body('phone').optional().matches(/\d{10}/).withMessage('Please enter a valid phone number'),
        body('address').optional().trim(),
        body('education').optional().trim()
      ];
    }
    case 'changePassword': {
      return [
        body('currentPassword', 'Current password is required').exists(),
        body('newPassword', 'Password must be at least 8 characters')
          .exists()
          .isLength({ min: 8 })
          .matches(/\d/)
          .withMessage('Password must contain a number')
      ];
    }
    case 'createAdmin': {
      return [
        body('email', 'Please enter a valid email').exists().isEmail(),
        body('password', 'Password must be at least 8 characters')
          .exists()
          .isLength({ min: 8 })
          .matches(/\d/)
          .withMessage('Password must contain a number'),
        body('fullName', 'Full name is required').exists().trim().isLength({ min: 2 }),
        body('role').optional().isIn(['admin', 'superAdmin'])
      ];
    }
  }
};

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return next(new AppError(errorMessages.join(', '), 400));
  }
  next();
};