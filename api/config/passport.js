const jwt = require('jsonwebtoken');
const config = require('../config/jwt_token.js');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const GoogleClient = require('../config/google');
const GithubClient = require('../config/github');
const User = require('../database/user').UserModel;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('google-auth',
    new GoogleStrategy(
        {
            clientID: GoogleClient.clientID,
            clientSecret: GoogleClient.clientSecret,
            callbackURL: '/api/users/auth/google/callback'
        },
        function(accessToken, refreshToken, params, profile, done) {
            let now = new Date();
            let expiryDate = new Date(now.getTime() + params.expires_in * 1000);
            User.findOne({ 'google.email': profile.emails[0].value}, function (err, user) {
                if (err)
                    return done(err);
                 else if (!user) {
                    let service = {email: profile.emails[0].value, displayName: profile.displayName, avatar: profile.photos[0].value, refresh_token: refreshToken, access_token: accessToken, expiration: expiryDate};
                    let newUser = new User({google: service, email: profile.emails[0].value, username: profile.displayName, provider: 'google'});
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

passport.use('gmail-auth',
    new GoogleStrategy(
        {
            clientID: GoogleClient.clientID,
            clientSecret: GoogleClient.clientSecret,
            callbackURL: "/api/users/auth/gmail/callback",
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, params, profile, done) {
            let now = new Date();
            let expiryDate = new Date(now.getTime() + params.expires_in * 1000);
            if (!req.session.token) {
                console.log("Token not supplied");
                return done(null, false);
            }
            jwt.verify(req.session.token, config.secret, (err, decoded) => {
                if (err) {
                    console.log('Invalid token');
                    return done(null, false);
                } else {
                    req.decoded = decoded;
                }
                User.findById(req.decoded.id, function (err, user) {
                    if (err || !user) {
                        console.log('No user found');
                        return done(null, false);
                    }
                    if (!refreshToken) {
                        console.log("Could not acquire google refresh token");
                        return done(null, false)
                    }
                    user.gmail = {email: profile.emails[0].value, access_token: accessToken, refresh_token: refreshToken, expiration: expiryDate};
                    user.save(function (err, user) {
                        if (err) {
                            console.log('Could not save user');
                            return done(err);
                        }
                        console.log("Saved user");
                        return done(null, user);
                    })
                })
            });
        }
    )
);

passport.use(new GithubStrategy(
        {
          clientID: GithubClient.clientID,
          clientSecret: GithubClient.clientSecret,
          callbackURL: "/api/users/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({ 'github.displayName': profile.username}, function (err, user) {
                if (err)
                    return done(err);
                 else if (!user) {
                    let service = {displayName: profile.username, avatar: profile.photos[0].value, refresh_token: refreshToken, access_token: accessToken};
                    let newUser = new User({github: service, username: profile.username, provider: 'github'});
                    newUser.save(function (err, newUser) {
                        if (err)
                            return done(err);
                        return done(null, newUser);
                    });
                } else {
                     if (user.github.refresh_token === undefined || user.github.refresh_token === null)
                         user.github.refresh_token = refreshToken;
                     user.save();
                    return done(null, user);
                }
            });
        }
    )
);

module.exports = passport;
