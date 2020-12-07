const mongoose = require('mongoose');
const tokenManager = require('../utils/token');
const User = require('../database/user').UserModel;

// @desc    Get user informations
// @route   POST /users/profile
exports.getProfile = (req, res, next) => {
  tokenManager.checkToken(req, res, function () {
    User.findById(req.decoded.id, function (err, user) {
      if (!err && user !== undefined && user !== null) {
        res.status(200);
        res.send({
          success: true,
          message: "User infos retrieved",
          user: user
        });
      } else {
        res.status(500);
        res.send({
          success: false,
          message: "User doesn't exist"
        })
      }
    });
  });
}

// @desc    Update user informations
// @route   PUT /users/profile
exports.updateProfile = (req, res, next) => {
  tokenManager.checkToken(req, res, function () {
    User.findById(req.decoded.id, function (err, user) {
      if (!err && user !== undefined && user !== null) {
        res.status(200);
        res.send({
          success: true,
          message: "User infos retrieved",
          user: user
        });
      } else {
        res.status(500);
        res.send({
          success: false,
          message: "User doesn't exist"
        })
      }
    });
  });
}
