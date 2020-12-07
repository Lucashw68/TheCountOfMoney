const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login_controller.js');

// @desc    Logout
// @route   POST /users/logout
router.post('/', loginController.logout);

module.exports = router;
