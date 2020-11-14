const express = require('express');
const mongoose = require('mongoose');

const initialize = require('./core/initialize')

const routes = require('./core/routes');

const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to mongodb database at [' + process.env.DB_URL + ']');
    initialize(app)
    routes(app)
  })
  .catch(err => {
    console.error('Could not connect to mongodb database:', err.stack);
    process.exit(1);
  });

module.exports = app;
