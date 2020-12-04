let mongoose = require('mongoose');
let ParameterSchema = require('./parameter').ParameterSchema;

let NotificationSchema = new mongoose.Schema({
  service: String,
  notification_id: String,
  parameters: [ParameterSchema]
});

module.exports = {NotificationSchema};
