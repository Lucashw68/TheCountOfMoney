const mongoose = require('mongoose');
const UserModel = require('../../database/user').UserModel;
const Preferences = require('../../database/preferences/app').AppPreferenceModel;
const listenerConfig = require('../../config/alerts');

function launch(callback)
{
  UserModel.find({}, function(err, users) {
    if (err) {
      console.error("User retrieving error");
      return callback(true);
    }

    let empty = true
    for (let user of users)
      if (user.alerts.length > 0)
        empty = false;

    if (empty)
      callback(false)
  });
}

module.exports = { launch };
