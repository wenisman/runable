const client = require('mongodb').MongoClient;
const config = require('config');
const taskify = require('./taskify');
const { of } = require('folktale/concurrency/task');

const connect = taskify(client.connect, client);

const getEvents = (name, data) => {
  let db = null;
  return connect(config.mongo.url)
    .chain((mongodb) => {
      db = mongodb;
      const collection = db.collection(name);

      return collection.find({
        type: 'event',
        date: { $gte: data.date.start, $lte: data.date.end },
        location: data.location
      });
    })
    .chain(result => {
      db.close();
      return of(result);
    });
};

module.exports = {
  getEvents
};