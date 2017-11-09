const Event = require('../models/event');


const setDate = (date, defaultDate) => {
  if (!date) {
    return defaultDate;
  }

  return new Date(Date.parse(date));
};

const search = async (location, startDate, endDate) => {
  let now = new Date();

  let testdate = setDate(endDate, new Date(now.setFullYear(now.getFullYear() + 1)));
  console.log(`close date: ${testdate}`);

  return Event.find({
    $and: [ 
      {
        $or: [ 
          { 'address.city' : location },   
          { 'address.state': location }, 
          { 'address.country': location }  
        ]
      },
      { 'registration.opening_date': { $lte: setDate(startDate, now) }},
      { 'registration.closing_date': { $gte: setDate(endDate, new Date(now.setFullYear(now.getFullYear() + 1))) }}
    ]
  })
    .exec();
};

const list = async (location) => {
  console.log('location search: ', location);
  return Event.find({
    $or: [ 
      { 'address.city' : location },   
      { 'address.state': location }, 
      { 'address.country': location }  
    ]
  })
    .exec();
};

const save = async(data) => {
  let event = new Event(data);

  return event.save();
};

module.exports = {
  list,
  search,
  save
};