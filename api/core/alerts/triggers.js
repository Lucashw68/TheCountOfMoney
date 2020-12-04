const mongoose = require('mongoose');
const UserModel = require('../database/user').UserModel;

const Twitter = require('twitter');
const twitterConfig = require('../config/twitter');

// =======================
// Triggers
// =======================

class Trigger {
  constructor(id, parameters) {
    this.id = id
    this.parameters = parameters
  }
  send(params) {
    throw new Error('Not implemented')
  }
}
