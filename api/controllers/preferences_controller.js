const mongoose = require('mongoose');
const tokenManager = require('../utils/token');
const App = require('../database/preferences/app').AppPreferenceModel;

// @desc    Get app preferences
// @route   GET /app/preferences
exports.getPreferences = (req, res, next) => {
  App.findOne({}, function (err, preferences) {
    if (!err && preferences !== undefined && preferences !== null) {
      res.status(200);
      res.send({
        success: true,
        message: "App preferences retrieved",
        preferences: preferences
      });
    } else {
      res.status(500);
      res.send({
        success: false,
        message: "No app preferences"
      })
    }
  });
}

// @desc    Update app preferences
// @route   PUT /app/preferences
exports.updatePreferences = (req, res, next) => {
  tokenManager.checkToken(req, res, function () {
    App.findOne({}, function (err, preferences) {
      if (!err && preferences !== undefined && preferences !== null) {

        preferences.k = !!req.body.k ? req.body.k : preferences.k
        preferences.n = !!req.body.n ? req.body.n : preferences.n
        preferences.cryptos_list = !!req.body.cryptos_list
          ? req.body.cryptos_list : preferences.cryptos_list
        preferences.feeds_list = !!req.body.feeds_list
          ? req.body.feeds_list : preferences.feeds_list

        preferences.save(function (err) {
          if (!err) {
            res.status(200);
            res.send({
              success: true,
              message: "App preferences updated successfully",
            });
          } else {
            res.status(500);
            res.send({
              success: false,
              message: "App preferences update failed"
            })
          }
        })
      } else {
        res.status(500);
        res.send({
          success: false,
          message: "No app preferences"
        })
      }
    });
  });
}
