// utils/email.js

const nodemailer = require('nodemailer');

exports.sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define email options
  const mailOptions = {
    from: 'Admin System admin@exampl.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // 3) Send the email
  await transporter.sendMail(mailOptions);
};

// Email templates
exports.getPasswordResetTemplate = (resetURL) => {
  return `
    <h1>Password Reset Request</h1>
    <p>You requested to reset your password. Click the link below to reset it:</p>
    <a href="${resetURL}" target="_blank">Reset Password</a>
    <p>If you didn't request this, please ignore this email.</p>
    <p>This link will expire in 10 minutes.</p>
  `;
};

exports.getWelcomeTemplate = (name) => {
  return `
    <h1>Welcome ${name}!</h1>
    <p>Welcome to the admin system. We're glad to have you on board.</p>
    <p>Please ensure you complete your profile setup and change your password on first login.</p>
  `;
};