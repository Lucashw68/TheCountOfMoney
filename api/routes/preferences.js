const express = require('express');
const router = express.Router();
const preferencesController = require('../controllers/preferences_controller.js');

// @desc    Get app preferences
// @route   GET /app/preferences
router.get('/preferences', preferencesController.getPreferences);

// @desc    Update app preferences
// @route   PUT /app/preferences
router.put('/preferences', preferencesController.updatePreferences);

module.exports = router;
