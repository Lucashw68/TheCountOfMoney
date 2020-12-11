let mongoose = require('mongoose');

let UserPreferenceSchema = new mongoose.Schema({
  currency: {
    type: String,
    default: 'EUR'
  },
  cryptos_list: [String],
  keywords_list: [String]
});

let UserPreferenceModel = mongoose.model("UserPreferences", UserPreferenceSchema);

exports.UserPreferenceSchema = UserPreferenceSchema;
exports.UserPreferenceModel = UserPreferenceModel;
