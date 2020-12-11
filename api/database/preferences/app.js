const mongoose = require('mongoose');

let AppPreferenceSchema = new mongoose.Schema({
  k: Number,
  n: Number,
  cryptos_list: [String],
  feeds_list: [String]
});

let AppPreferenceModel = mongoose.model("AppPreferences", AppPreferenceSchema);

exports.AppPreferenceSchema = AppPreferenceSchema;
exports.AppPreferenceModel = AppPreferenceModel;
