const mongoose = require('mongoose');

let address = new mongoose.Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  country: String,
  post_code: String
});

module.exports = mongoose.model('Address', address);