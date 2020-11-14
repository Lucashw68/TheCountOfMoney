const jwt = require('jsonwebtoken');
const config = require('../config/jwt_token.js');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GoogleClient = require('../config/google');
const User = require('../database/user').UserModel;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

const production = false
const localCallbackURL = "/api/auth/google/callback"
const prodCallbackURL = "https://[your application]/api/auth/google/callback"
const callbackURL = production
  ? prodCallbackURL
  : localCallbackURL

passport.use('google-auth',
    new GoogleStrategy(
        {
            clientID: GoogleClient.clientID,
            clientSecret: GoogleClient.clientSecret,
            callbackURL: callbackURL
        },
        function(accessToken, refreshToken, params, profile, done) {
            let now = new Date();
            let expiryDate = new Date(now.getTime() + params.expires_in * 1000);
            User.findOne({ 'google.email': profile.emails[0].value}, function (err, user) {
                if (err)
                    return done(err);
                 else if (!user) {
                    let service = {email: profile.emails[0].value, displayName: profile.displayName, refresh_token: refreshToken, access_token: accessToken, expiration: expiryDate};
                    let newUser = new User({google: service});
                    newUser.save(function (err, newUser) {
                        if (err)
                            return done(err);
                        return done(null, newUser);
                    });
                } else {
                     if (user.google.refresh_token === undefined || user.google.refresh_token === null)
                         user.google.refresh_token = refreshToken;
                     user.save();
                    return done(null, user);
                }
            });
        }
    )
);

module.exports = passport;
