const db = require('../lib/mongo');

const login = (data) => {
  return db.find('users', {});
};

module.exports = {
  login
}