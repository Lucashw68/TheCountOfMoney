const mongoose = require('mongoose');
const tokenManager = require('../utils/token');
const user = require('../database/user');

// @desc    Authentication with email/password
// @route   POST /users/login
exports.login = (req, res, next) => {
  if (req.body.email !== undefined && req.body.password !== undefined) {
    user.UserModel.findOne({ email: req.body.email }, function(err, user) {
      if (user !== undefined && user !== null && req.body.password === user.password) {
        res.status(200);
        res.send({
          success: true,
          message: "Connected",
          token: tokenManager.generateToken(user.id)
        });
      } else {
        res.status(403);
        res.send({
          success: false,
          message: "Invalid credentials"
        });
      }
    });
  } else {
    res.status(400);
    res.send({
      success: false,
      message: "Invalid credentials"
    });
  }
}

exports.logout = (req, res, next) => {
  res.status(200);
  res.send({
    success: true,
    message: "Logged out"
  });
}
