const mongoose = require('mongoose');

let phone = new mongoose.Schema({
  country_code: Number,
  area_code: Number,
  number: Number
});


module.exports = mongoose.model('Phone', phone);