const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../database/user').UserModel;
const tokenManager = require('../utils/token');

router.get('/', function (req, res, next) {
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
});

router.put('/', function (req, res, next) {
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
});

module.exports = router;
