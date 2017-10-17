const db = require('../lib/mongo');
const hash = require('object-hash');

const login = (data) => {
  // make sure we hash the users password
  let user = db.find('users', { 'login_id': data.login_id });
  let pwd = hash(data.password);
};

module.exports = {
  login
}