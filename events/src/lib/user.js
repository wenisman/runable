const User = require('../models/user');

const save = async (data) => {
  let user = new User({
    first_name: data.firstName,
    surname: data.surName,
    contact: data.email
  });

  return user.save();
};

const details = async (id) => {
  return User.findById(id).exec();
};

const registerevent = async (data) => {
  return User
    .findById(data.userId)
    .exec()
    .then((user) => {
      user.registrations.push({
        event_id: data.eventId,
        price_paid: data.pricePaid,
        registration_data: new Date()
      });

      return user.save();
    });
};

module.exports = {
  save,
  details,
  registerevent
};