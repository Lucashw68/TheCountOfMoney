let mongoose = require('mongoose');

let CryptoSchema = new mongoose.Schema({
    name: String,
    code: String,
    image: String,
});
let CryptoModel = mongoose.model("Crypto", CryptoSchema);

exports.CryptoSchema = CryptoSchema;
exports.CryptoModel = CryptoModel;
