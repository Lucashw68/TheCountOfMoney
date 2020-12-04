let mongoose = require('mongoose');
let NotificationSchema = require('./notification').NotificationSchema;
let TriggerSchema = require('./trigger').TriggerSchema;

let AlertSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  notification: NotificationSchema,
  trigger: TriggerSchema
});

module.exports = {AlertSchema};
