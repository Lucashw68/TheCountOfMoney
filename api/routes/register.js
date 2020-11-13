const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../database/user');

router.post('/', function (req, res, next) {
    if (req.body.email !== undefined && req.body.password !== undefined && req.body.email.length > 0 && req.body.password.length > 0) {
        let newUser = new user.UserModel({email: req.body.email, password: req.body.password});
        user.UserModel.find({ email: req.body.email}, function(err, users) {
            if (users === undefined || users.length === 0)
                newUser.save(function (err, newUser) {
                    if (err) {
                        res.status(500);
                        res.send({
                            success: false,
                            message: "Register account failed"
                        });
                    } else {
                        console.log("New user: " + req.body.email);
                        res.status(200);
                        res.send({
                            success: true,
                            message: "Account succesfully created"
                        });
                    }
                });
            else {
                res.status(400);
                res.send({
                    success: false,
                    message: "Email already in use"
                });
            }
        });
    } else {
        res.status(500);
        res.send({
            success: false,
            message: "Internal Error"
        });
    }
});

module.exports = router;
