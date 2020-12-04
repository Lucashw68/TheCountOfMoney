const mongoose = require('mongoose');
const UserModel = require('../database/user').UserModel;

const Twitter = require('twitter');
const twitterConfig = require('../config/twitter');

// =======================
// Alerts
// =======================

class Alert {
  constructor(id, parameters) {
    this.id = id
    this.parameters = parameters
  }
  send(parameters) {
    throw new Error('Not implemented')
  }
}

class EmailAlert extends Alert {
  constructor(id, parameters) {
    super(id, parameters)
    this.email = this.parameters.find(param => param.key === "email").value;
    this.subject = this.parameters.find(param => param.key === "subject").value;
    this.body = this.parameters.find(param => param.key === "body").value;
  }

  send(parameters) {
  }
}

class TwitterPost extends Alert {
  constructor(id, parameters) {
    super(id, parameters)
  }

  send(parameters) {
  }
}
