let mongoose = require('mongoose');
let ParameterSchema = require('./parameter').ParameterSchema;

let TriggerSchema = new mongoose.Schema({
  service: String,
  trigger_id: String,
  parameters: [ParameterSchema]
});

module.exports = {TriggerSchema};
