const db = require('../lib/mongo');

const getEvents = (name, data) => {
  return db.find('events', {
        type: 'event',
        date: { $gte: data.date.start, $lte: data.date.end },
        location: data.location
      }).run().promise();
};

module.exports = {
  getEvents
};