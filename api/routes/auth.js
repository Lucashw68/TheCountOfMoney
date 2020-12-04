let express = require('express');
let router = express.Router();
let axios = require('axios').default;
let qs = require('querystring');
let twitterConfig = require('../config/twitter');
let googleConfig = require('../config/google');
let githubConfig = require('../config/github');
let passport = require('../config/passport');
let User = require('../database/user').UserModel;
let tokenManager = require('../utils/token');
let jwt = require('jsonwebtoken');
let config = require('../config/jwt_token');
let {OAuth2Client} = require('google-auth-library');

// =======================
// Google auth
// =======================

router.get('/google',
  passport.authenticate("google-auth", { scope: ["profile", "email"], accessType: 'offline' })
);

router.get('/google/callback',
  passport.authenticate("google-auth"),
  function(req, res) {
    const token = tokenManager.generateToken(req.user.id);
    res.redirect((process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_PROD_URL
      : process.env.CLIENT_DEV_URL) + '/login?token=' + token);
});

// =======================
// Github auth
// =======================

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    const token = tokenManager.generateToken(req.user.id);
    res.redirect((process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_PROD_URL
      : process.env.CLIENT_DEV_URL) + '/login?token=' + token);
  });

// =======================
// Gmail auth
// =======================

router.get('/gmail', function(req, res, next) {
  if (!req.query.token)
    res.redirect((process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_PROD_URL
      : process.env.CLIENT_DEV_URL) + '/profile?service=gmail&success=false');
  req.session.token = req.query.token;
  const authenticator = passport.authenticate("gmail-auth", {scope: googleConfig.gmailScopes, state: req.query.token, accessType: 'offline', prompt: 'consent'});
  authenticator(req, res, next);
});

router.get('/gmail/callback',
  passport.authenticate("gmail-auth"), function (req, res) {
    if (!req.user)
      res.redirect((process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_PROD_URL
        : process.env.CLIENT_DEV_URL) + '/profile?service=gmail&success=false');
    else
      res.redirect((process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_PROD_URL
        : process.env.CLIENT_DEV_URL) + '/profile?service=gmail&success=true');
});

// =======================
// Twitter auth
// =======================

router.get('/twitter', function(req, res, next) {
    if (!req.query.token)
      res.redirect((process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_PROD_URL
        : process.env.CLIENT_DEV_URL) + '/profile?service=twitter&success=false');
    req.session.token = req.query.token;
    const authenticator = passport.authenticate("twitter-auth", {scope: ["profile", "email"], state: req.query.token});
    authenticator(req, res, next);
});

router.get('/twitter/callback',
  passport.authenticate("twitter-auth"), function (req, res) {
    if (!req.user)
      res.redirect((process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_PROD_URL
        : process.env.CLIENT_DEV_URL) + '/profile?service=twitter&success=false');
    else
      res.redirect((process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_PROD_URL
        : process.env.CLIENT_DEV_URL) + '/profile?service=twitter&success=true');
});

module.exports = router;
