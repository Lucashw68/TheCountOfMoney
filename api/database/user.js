const mongoose = require('mongoose');
const GoogleSchema = require('./services/google').GoogleSchema;
const GithubSchema = require('./services/github').GithubSchema;
const TwitterSchema = require('./services/twitter').TwitterSchema;
const AlertSchema = require('./alerts').AlertSchema;
const PreferenceSchema = require('./preferences/user').UserPreferenceSchema;

let UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    google: GoogleSchema,
    gmail: GoogleSchema,
    github: GithubSchema,
    twitter: TwitterSchema,
    provider: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    alerts: [AlertSchema],
    preferences: PreferenceSchema
});

let UserModel = mongoose.model("User", UserSchema);

exports.UserSchema = UserSchema;
exports.UserModel = UserModel;
