const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../database/user');
const tokenManager = require('../utils/token');

router.post('/', function (req, res, next) {
  res.status(500);
  res.send({
    success: false,
    message: "Not implemented"
  });
});

module.exports = router;
