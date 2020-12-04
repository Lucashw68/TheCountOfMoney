let mongoose =  require('mongoose');

let TwitterSchema = new mongoose.Schema({
    id: String,
    token: String,
    token_secret: String
});

module.exports = {TwitterSchema};
