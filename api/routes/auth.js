const express = require('express');
const router = express.Router();
const twitterConfig = require('../config/twitter');
const googleConfig = require('../config/google');
const githubConfig = require('../config/github');
const passport = require('../config/passport');
const tokenManager = require('../utils/token');

// =======================
// Google auth
// =======================

// @desc    Authentication with google
// @route   GET /users/auth/google
router.get('/google',
  passport.authenticate("google-auth", { scope: ["profile", "email"], accessType: 'offline' })
);

// @desc    Callback authentication google
// @route   GET /users/auth/google/callback
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

// @desc    Authentication with github
// @route   GET /users/auth/github
router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));


// @desc    Callback authentication github
// @route   GET /users/auth/github/callback
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

// @desc    Gmail service
// @route   GET /users/auth/gmail
router.get('/gmail', function(req, res, next) {
  if (!req.query.token)
    res.redirect((process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_PROD_URL
      : process.env.CLIENT_DEV_URL) + '/profile?service=gmail&success=false');
  req.session.token = req.query.token;
  const authenticator = passport.authenticate("gmail-auth", {scope: googleConfig.gmailScopes, state: req.query.token, accessType: 'offline', prompt: 'consent'});
  authenticator(req, res, next);
});

// @desc    Callback gmail
// @route   GET /users/auth/gmail/callback
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

// @desc    Twitter service
// @route   GET /users/auth/twitter
router.get('/twitter', function(req, res, next) {
    if (!req.query.token)
      res.redirect((process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_PROD_URL
        : process.env.CLIENT_DEV_URL) + '/profile?service=twitter&success=false');
    req.session.token = req.query.token;
    const authenticator = passport.authenticate("twitter-auth", {scope: ["profile", "email"], state: req.query.token});
    authenticator(req, res, next);
});

// @desc    Callback twitter
// @route   GET /users/auth/twitter/callback
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
