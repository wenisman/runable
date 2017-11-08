const Event = require('../models/event');


const setDate = (date, defaultDate) => {
  if (!date) {
    return defaultDate;
  }

  return Date.parse(date);
};

const search = async (location, startDate, endDate) => {
  let now = new Date();
  return Event.find({
    $and: [
      {
        $or: [ 
          { address: { city : location } }, 
          { address: { state: location } }, 
          { address: { country: location } }  
        ]
      },
      {
        event: {
          registration: {
            opening_date: setDate(startDate, now),
            closing_date: setDate(endDate, new Date(now.setFullYear(now.getFullYear() + 1)))
          }
        }
      }
    ],
  })
    .exec();
};

const save = async(data) => {
  let event = new Event({
    name: data.name,
    address: {
      line1: data.address.street,
      city: data.address.city,
      state: data.address.state,
      country: data.address.country,
      post_code: data.address.postCode
    },
    description: {
      short: data.shortDescription,
      long: data.longDescription
    },
    registration: {
      opening_date: data.registration.openingDate,
      closing_date: data.registration.closingDate,
      rrp: data.registration.retailPrice,
      member_price: data.registration.memberPrice
    }
  });

  return event.save();
};

module.exports = {
  search,
  save
};