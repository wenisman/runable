const client = require('mongodb').MongoClient;
const config = require('config');
const taskify = require('./taskify');
const Task = require('folktale/concurrency/task');

const connect = taskify(client.connect, client);

let mongodb = null;
connect(config.get('mongo.url'), config.get('mongo.connection')).run().future().map(result => {
  mongodb = result;
});


const find = async (collection, query) => {
  var create = taskify(mongodb.createCollection, mongodb);
  return await create(collection)
      .chain(c => {
        var findInCollection = taskify(c.find, c);
        return findInCollection(query);
      }).chain( result => {
        var toArray = taskify(result.toArray, result);
        return toArray();
      })
      .orElse(err => {
        console.log('error during search - ', query, err);
      })
      .run().promise();
};

const save = async (collection, document) => {
  var create = taskify(mongodb.createCollection, mongodb);
  return await create(collection)
  .chain(c => {
    var insertCollection = taskify(c.insert, c);
    return insertCollection(document);
  })
  .chain(result => {
    return Task.of(true);
  })
  .orElse(err => {
    console.log('error saving document - ', err);
    return Task.of(false);
  })
  .run().promise();
};

module.exports = {
  mongodb,
  find,
  save
};
