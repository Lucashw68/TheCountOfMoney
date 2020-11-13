const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../database/user').UserModel;
const tokenManager = require('../utils/token');

router.get('/user', function (req, res, next) {
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

router.get('/email', function (req, res, next) {
    tokenManager.checkToken(req, res, function () {
        User.findById(req.decoded.id, function (err, user) {
            if (!err && user !== undefined && user !== null) {
                res.status(200);
                res.send({
                    success: true,
                    message: "Email retrieved",
                    email: (!!user.email ? user.email : null),
                    google_email: (!!user.google ? user.google.email : null)
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

router.get('/name', function (req, res, next) {
    tokenManager.checkToken(req, res, function () {

        User.findById(req.decoded.id, function (err, user) {
            if (!err && user !== undefined && user !== null) {
                res.status(200);
                res.send({
                    success: true,
                    message: "Name retrieved",
                    name: !!user.google ? user.google.displayName : user.email
                });
            } else {
                res.status(500);
                res.send({
                    success: false,
                    message: "User doesn't exist"
                })
            }
        });

    })
});

module.exports = router;
