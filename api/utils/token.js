const jwt = require('jsonwebtoken');
const config = require('../config/jwt_token.js');

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

module.exports = {checkToken, generateToken, getExpiration, isExpired};
