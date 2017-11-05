const mongoose = require('mongoose');


let registration = mongoose.Schema({
  event_id: String,
  price_paid: Number,
  registration_date: Date
});

module.export = mongoose.model('Registration', registration);