let mongoose =  require('mongoose');

let GoogleSchema = new mongoose.Schema({
    avatar: String,
    email: String,
    displayName: String,
    refresh_token: String,
    access_token: String,
    expiration: Number
});

module.exports = {GoogleSchema};
