const mongoose = require('mongoose');
const UserModel = require('../../database/user').UserModel;
const Preferences = require('../../database/preferences/app').AppPreferenceModel;
const listenerConfig = require('../../config/alerts');

function launch(callback)
{
  // Preferences.find({}, function(err, prefs) {
  //   if (err) {
  //     console.error("User retrieving pref");
  //     return callback(true);
  //   }
  //
  //   if (prefs.length > 0) {
  //     for (let pref of prefs) {
  //       console.log('Pref: ', pref)
  //     }
  //   } else {
  //     console.log('No pref')
  //   }
  // })

  UserModel.find({}, function(err, users) {
    if (err) {
      console.error("User retrieving error");
      return callback(true);
    }

    let empty = true
    for (let user of users)
      if (user.alerts.length > 0)
        empty = false;

    // if (users.length > 0) {
    //   console.log('Number of user(s): [' + users.length + ']')
    //   for (let user of users) {
    //     console.log('User: ', user.email)
    //   }
    // } else {
    //   console.log('No users')
    // }

    if (empty)
      callback(false)
  });
}

module.exports = { launch };
