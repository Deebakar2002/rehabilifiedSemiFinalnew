const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const {connectDB} = require('./config/db');

const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const eventRoutes = require('./routes/eventRoutes');
const errorHandler = require('./middleware/errorHandler');
const adminAccessRouter = require('./routes/adminAccessRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Load environment variables
dotenv.config();

// Check for required environment variables
const requiredEnvVars = ['JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`${envVar} is not defined in the environment variables.`);
    process.exit(1);
  }
}

// Initialize the app
const app = express();

connectDB();

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
};

// Apply security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:", "http://localhost:5000"],
    },
  },
}));

// Apply CORS and logging middlewares
app.use(cors(corsOptions));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('combined'));
}

// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan('combined'));
app.use(errorHandler);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes 
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api', eventRoutes);
app.use('/api/adminAccess',adminAccessRouter);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/payments',paymentRoutes);
// Connect to MongoDB

// 404 Error handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// General Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});