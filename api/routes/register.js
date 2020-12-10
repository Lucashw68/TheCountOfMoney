const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register_controller.js');

// @desc    Registration with username/email/password
// @route   POST /users/register
router.post('/', registerController.register);

module.exports = router;
