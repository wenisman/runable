const client = require('mongodb').MongoClient;
const config = require('config');
const taskify = require('./taskify');

const connect = taskify(client.connect, client);

const getEvents = (data, params) => {
  let db = null;
  return connect(config.mongo.url)
    .chain((mongodb) => {
        db = mongodb;
        const collection = db.collection(data);

        collection.find({
            type: 'event',
            date: { $gte: Date.now() , $lte: Date.now() },
            location: params.location
        });

    })
    .chain(() => {
      db.close();
    });
};

module.exports = {
  getEvents
};