const User = require('../models/user');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');

const save = async (data) => {
  if (data.account.local) {
    data.account.local.id = data.account.local.id || uuid();
    // hash out the password
    data.account.local.password = await bcrypt.hash(data.account.local.password || uuid(), 10);
  }
  let user = new User(data);

  return user.save();
};

const details = async (id) => {
  return User.findOne({
    'account.local.id': id
  }).exec();
};

const registerevent = async (data) => {
  // TODO : validate if the user has already registered for this event
  return User
    .findOne({
      'account.local.id': data.user.id
    })
    .exec()
    .then((user) => {
      user.registrations.push({
        event_id: data.event.id,
        price_paid: data.event.price_paid,
        registration_date: new Date(),
        status: 'registered'
      });

      return user.save();
    });
};

module.exports = {
  save,
  details,
  registerevent
};