let express = require('express');
let router = express.Router();
let axios = require('axios').default;
let qs = require('querystring');
let googleConfig = require('../config/google');
let passport = require('../config/passport');
let User = require('../database/user').UserModel;
let tokenManager = require('../utils/token');
let jwt = require('jsonwebtoken');
let config = require('../config/jwt_token');
let {OAuth2Client} = require('google-auth-library');

router.get('/google',
    passport.authenticate("google-auth", { scope: ["profile", "email"], accessType: 'offline' })
);

router.get('/google/callback',
    passport.authenticate("google-auth"),
    function(req, res) {
        const token = tokenManager.generateToken(req.user.id);
        const production = false;
        res.redirect(production
          ? "http://[your application]/?token=" + token
          : "http://localhost:8080/?token=" + token);
});

module.exports = router;
