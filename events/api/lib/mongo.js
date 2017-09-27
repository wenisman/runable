const client = require('mongodb').MongoClient;
const config = require('config');
const taskify = require('./taskify');
const Task = require('folktale/concurrency/task');

const connect = taskify(client.connect, client);
const mongodb = connect(config.get('mongo.url'), config.get('mongo.connection')).run().promise();

const find = (collection, query) => {
  console.log(mongodb);
  return Task.nodebacktoTask(mongodb.collection(collection).find(query).toArray);
};

module.exports = {
  mongodb,
  find
};
