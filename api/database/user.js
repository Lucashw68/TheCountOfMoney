let mongoose = require('mongoose');
let GoogleSchema = require('./services/google').GoogleSchema;

let UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    insurance: String,
    google: GoogleSchema,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});
let UserModel = mongoose.model("User", UserSchema);

exports.UserSchema = UserSchema;
exports.UserModel = UserModel;
