const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller.js');

// @desc    Get user informations
// @route   POST /users/profile
router.get('/', profileController.getProfile);

// @desc    Update user informations
// @route   PUT /users/profile
router.put('/', profileController.updateProfile);

module.exports = router;
