const eventDb = require('../lib/events');


const setDate = (swaggerValue, defaultDate) => {
  if (!swaggerValue) {
    return defaultDate;
  }

  return Date.parse(swaggerValue.value);
}

const search = async (req, res) => {
  let startDate = new Date();
  let endDate = new Date()
  let data = {
    location: req.swagger.params.location.value,
    date: {
      start: setDate(req.swagger.params.startDate.value, startDate),
      end: setDate(req.swagger.params.endDate.value, new Date(endDate.setFullYear(endDate.getFullYear() + 1)))
    }
  };
  var output = await eventDb.getEvents(data);
  res.json(output);
};

const upload = async (req, res) => {
  let data = {
    type: 'event',
    location: req.swagger.params.body.value.location,
    date: new Date(req.swagger.params.body.value.date),
    source: 'api'
  };

  var output = await eventDb.saveEvents(data);
  res.json(output);
};


module.exports = {
  search,
  upload
};