// TODO : npm install --save oath
const oauth = require('oauth');
const config = require('config');

let oauth1 = (providerUrl) => {
    return new oauth.OAuth(
    `${providerUrl}/request_token`,
    `${providerUrl}/access_token`,
    config.get('oauth.key.app'),
    config.get('oauth.key.secret'),
    '1.0A',
    null,
    'HMAC-SHA1'
  );
};

let oauth2 = new oauth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  config.get('oauth.appKey'),
  config.get('oauth.secretKey'),
  '1.0A',
  null,
  'HMAC-SHA1'
);


const oauthOne = (data) => {

};

const oauthTwo = (data) => {

};

const auth = (data) => {
  // call to external provider if specified
};



module.exports = {
};