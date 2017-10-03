const eventDb = require('../lib/events');


const setDate = (swaggerValue, defaultDate) => {
  if (!swaggerValue) {
    return defaultDate.toUTCString();
  }

  return (Date.parse(swaggerValue.value)).toUTCString();
}

const search = async (req, res) => {
  console.log(req.swagger.params.startDate.value);
  let currentDate = Date.now();
  let data = {
    location: req.swagger.params.location.value,
    date: {
      start: setDate(req.swagger.params.startDate.value, currentDate),
      end: setDate(req.swagger.params.endDate.value, currentDate.setFullYear(currentDate.getFullYear() + 1))
    }
  };
  console.log('api query:', data);
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