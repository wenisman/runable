const mongoose = require('mongoose');

const address = require('./address');
const phone = require('./phone');
const registration = require('./registration');


let user = new mongoose.Schema({
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
      display_name: String
    }
  },
  contact: {
    email: String,
    address: address.schema,
    phones: [
      phone.schema
    ]
  },
  registrations: [ registration.schema ]
});

module.exports = mongoose.model('User', user);