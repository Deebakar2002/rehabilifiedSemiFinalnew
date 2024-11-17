// routes/adminRoutes.js
const express = require('express');
const { loginAdmin, getAdminDashboard } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/admin/login: Admin login route
router.post('/login', loginAdmin);

// GET /api/admin/admin-dashboard: Protected route for admin dashboard
// routes/adminRoutes.js
router.get('/admin-dashboard', protectAdmin, getAdminDashboard);


module.exports = router;