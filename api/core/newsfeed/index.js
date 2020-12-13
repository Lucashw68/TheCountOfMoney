let mongoose = require('mongoose');
let feeder = require('./feeder');

function newsfeed(callback) {
  feeder.launch(function(err) {
    if (err) {
      console.error("Unable to start news manager");
      return callback(true);
    }
    return callback(false);
  });
}

module.exports = newsfeed;
