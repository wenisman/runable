const mongoose = require('mongoose');

let registration = new mongoose.Schema({
  event_id: String,
  price_paid: Number,
  registration_date: Date,
  status: String
});

module.exports = mongoose.model('Registration', registration);