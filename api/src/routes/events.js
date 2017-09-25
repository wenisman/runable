const router = require('express').Router();
const client = require('mongodb').MongoClient;
const config = require('config');

/**
 * initialisation steps
 * TODO: read this from config
 */

/**
 * Addition of time stamping requests, put this on so that every request 
 * can be timed for performance down the track
 */
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});


router.get('/events/:id', (req, res) => {
  // read the event from mongo
  client.connect(config.mongo.url, (err, db) => {
  });
});

module.exports = router;