let mongoose = require('mongoose');
let listener = require('./listener');

function alerts(callback) {
  listener.launch(function(err) {
    if (err) {
      console.error("Unable to start alerts manager");
      return callback(true);
    }
    return callback(false);
  });
}

module.exports = alerts;
