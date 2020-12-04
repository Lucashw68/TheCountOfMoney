const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../database/user');

router.post('/', function (req, res, next) {
    res.status(200);
    res.send({
      success: true,
      message: "Logged out"
    });
  }
});

module.exports = router;
