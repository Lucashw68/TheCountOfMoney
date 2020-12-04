const mongoose = require('mongoose');
const UserModel = require('../../database/user').UserModel;
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

    if (users.length > 0) {
      console.log('Users: ', users.email)
    } else {
      console.log('No users')
    }

    if (empty)
      callback(false)

    // let failing = false;
    // let empty = true;
    //
    // for (let user of users)
    //   if (user.area.length > 0)
    //     empty = false;
    //
    // if (empty) {
    //   callback(false);
    // } else {
    //   for (let i = 0; i < users.length; ++i) {
    //     for (let j = 0; j < users[i].area.length; ++j) {
    //       bindActionReaction(users[i]._id, users[i].area[j]._id, i === users.length - 1 && j === users[i].area.length - 1, function (err, last) {
    //       if (err && !failing) {
    //         failing = true;
    //         return callback(true);
    //       }
    //       if (!err && !failing && last)
    //         return callback(false);
    //       });
    //     }
    //   }
    // }
    // setInterval(runChecks, listenerConfig.refreshTime);
  });
}

module.exports = { launch };
