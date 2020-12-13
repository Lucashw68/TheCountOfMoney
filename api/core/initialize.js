const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const newsfeed = require('./newsfeed');
const passport = require('passport');
const express = require('express');
const alerts = require('./alerts');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');

const {allowedOrigins} = require('../config/origins');

module.exports = function(app) {

  alerts(function (err) {
    if (err) {
      console.error('Launching alert service failed');
      process.exit(1);
    } else
      console.log('Alert service is running');
  });

  newsfeed(function (err) {
    if (err) {
      console.error('Launching newsfeed service failed');
      process.exit(1);
    } else
      console.log('Newsfeed service is running');
  });

  app.disable('x-powered-by');

  app.use(helmet());

  app.use(cors())
  // app.use(cors({
  //   origin: function(origin, callback) {
  //     if (!origin) return callback(null, true);
  //     if (allowedOrigins.indexOf(origin) === -1) {
  //       const msg = 'The CORS policy for this site does not ' +
  //                 'allow access from the specified Origin.';
  //       return callback(new Error(msg), false);
  //     }
  //     return callback(null, true);
  //   }
  // }));

  app.use(logger('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(cookieSession({
    name: 'the-count-of-money-session',
    keys: ['the-count-of-money-secret'],
    maxAge: 24 * 60 * 60 * 1000
  }));

  app.use(passport.initialize());
  app.use(passport.session());
}
