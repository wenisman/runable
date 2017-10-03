const db = require('../lib/mongo');

const getEvents = (data) => {
  var temp = db.find('events', {
        type: 'event',
        date: { $gte: data.date.start, $lte: data.date.end },
        location: data.location
      });

  return temp
};

const saveEvents = (data) => {
  return db.save('events', data);
};

module.exports = {
  getEvents,
  saveEvents
};