const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login_controller.js');

// @desc    Authentication with email/password
// @route   POST /users/login
router.post('/', loginController.login);

module.exports = router;
