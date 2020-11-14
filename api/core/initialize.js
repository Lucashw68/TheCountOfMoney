const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');

const allowedOrigins = require('../config/origins');

module.exports = function(app) {
  app.disable('x-powered-by');

  app.use(helmet());

  app.use(cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));

  app.use(logger('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, 'public')));

  app.use(expressSession({
      resave: false,
      saveUninitialized: true,
      secret: 'the-count-of-money-secret'
  }));

  app.use(passport.initialize());
  app.use(passport.session());
}
