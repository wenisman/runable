const mongoose = require('mongoose');
const address = require('./address');
const phone = require('./phone');

let event = mongoose.Schema({
  address: address.schema,
  contact: {
    email: String,
    phones: [
      phone.schema
    ]
  },
  description: {
    short: String,
    long: String,
    background_image: String
  },
  registration: {
    opening_date: Date,
    closing_date: Date,
    rrp: Number,
    member_price: Number
  }
});

module.exports = mongoose.model('Event', event);