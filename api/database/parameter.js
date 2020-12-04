let mongoose = require('mongoose');

let ParameterSchema = new mongoose.Schema({
  key: String,
  value: String
});

module.exports = {ParameterSchema};
