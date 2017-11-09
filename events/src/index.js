const app = require('express')();
const config = require('config');
const bodyParser = require('body-parser');

const models = require('./models');

const events = require('./routes/events');
const user = require('./routes/user');


// prewarm the connection
const mongoose = require('mongoose');
mongoose.connect(config.get('mongo.url'), config.get('mongo.connection_options'));

// required for testing 
module.exports = app;

// setup the middle wares
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/* set up custom routes */
app.use('/user', user);
app.use('/event', events);

// start the express app
const port = config.get('PORT') || 9000;
app.listen(port, () => {
  console.log(`runable event api - started on port ${port}!`);
});