const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const address = require('./address');
const phone = require('./phone');
const registration = require('./Registration');

let user = mongoose.Schema({
  first_name: String,
  surname: String,
  account: {
    local: {
      id: String,
      password: String,
      token: String,
      email: String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    twitter: {
      id: String,
      token: String,
      user_name: String,
      display_name:String
    }
  },
  contact: {
    email: String
  }
});

user.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

user.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.account.local.password);
};

module.exports = mongoose.model('User', user);