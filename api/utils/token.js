const jwt = require('jsonwebtoken');
const config = require('../config/jwt_token.js');
const User = require('../database/user');
const UserModel = User.UserModel;

function checkToken(req, res, callback) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.status(401);
                res.send({
                    success: false,
                    message: "No token"
                });
            } else {
                req.decoded = decoded;
                callback();
            }
        });
    } else {
        res.status(401);
        res.send({
            success: false,
            message: "No token"
        });
    }
}

function isAdmin(req, res, next) {
    const userId = req.decoded.id;
    UserModel.findOne({ _id: userId }, (err, user) => {
        if (!user)
            return res.status(404).send({ message: `User with id ${userId} doesn't exists.` });

        if (user.role === "admin") {
            next();
            return;
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
    });
};

function generateToken(id) {
    return jwt.sign({id: id}, config.secret, { expiresIn: '24h' });
}

function getExpiration(expires_in) {
    let now = new Date();
    let expiryDate = new Date(now.getTime() + expires_in * 1000);

    return (expiryDate);
}

function isExpired(expiration) {
    let now = new Date();
    now.setSeconds(now.getSeconds() + 60);
    return (expiration < now.getTime())
}

module.exports = {checkToken, generateToken, getExpiration, isExpired, isAdmin};
