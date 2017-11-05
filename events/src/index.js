const app = require('express')();
const events = require('./lib/event');
const user = require('./lib/user');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.yml');

// prewarm the connection
const mongoose = require('mongoose');
mongoose.connect(config.get('mongo.url'), config.get('mongo.connection_options'));


// required for testing 
module.exports = app;

let config = {
  appRoot: __dirname
};

// setup the middle wares
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * set up standard logging for all requests
 */
app.use(logfmt.requestLogger({elapsed: 'request.time'}, (req, res) => {
  return {
    'request.method': req.method,
    'request.path': req.path
  };
}));


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't return status of 401
  res.status(401);
}


app.get('/event/search/:location/:startDate/:endDate', (req, res) => {
  events
    .search(req.params.location, req.params.startDate, req.params.endDate)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

// TODO : put in the passport authentication middle wares
app.post('/event/upload', (req, res) => {
  events
    .save(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

app.post('/user/login', (req, res) => {
  // TODO : use pass port to authenticate
});

app.post('/user/save', (req, res) => {
  user
    .save(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

app.get('/user/details', (req, res) => {
  user
    .details(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});

app.post('/user/registerevent', (req, res) => {
  user
    .registerEvent(data)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(503).json(err);
    });
});


// start the express app
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`runable event api - started on port ${port}!`);
});