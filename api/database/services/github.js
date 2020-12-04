let mongoose =  require('mongoose');

let GithubSchema = new mongoose.Schema({
  avatar: String,
  displayName: String,
  refresh_token: String,
  access_token: String,
});

module.exports = {GithubSchema};
