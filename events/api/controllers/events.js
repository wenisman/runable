const eventDb = require('../lib/events');

const listEvents = (req, res) => {
  let data = {
    location: req.swagger.params.location.value,
    date: {
      start: req.swagger.params.startDate.value || Date.now(),
      end: req.swagger.params.endDate.value || Date.now()
    }
  };
  res.json(eventDb.getEvents('events', data).run().promise());
};

module.exports = {
  listEvents
};