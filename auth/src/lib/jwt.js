const jws = require('jws');
const config = require('config');

const toBase64 = (input) => {
  if (typeof(input) !== 'string') {
    input = JSON.stringify(input);
  }

  let buf = Buffer.from(input, 'ascii');
  return buf.toString('base64');
};

const fromBase64 = (input) => {
  let buf = Buffer.from(input, 'base64');
  return buf.toString('ascii');
};

const createToken = (payload, ttl) => {
  if (!ttl) {
    ttl = config.get('jwt.ttl');
  }

  let header = { alg: 'HS256', typ: 'JWT' };
  
  let signature = jws.sign({
    header: header,
    payload: payload,
    secret: config.get('jwt.secret')
  });

  let now = new Date();
  payload.exp = new Date(now.setUTCSeconds(now.getUTCSeconds() + ttl)).UTC();
  let jwt = `${toBase64(header)}.${toBase64(payload)}.${signature}`;

  return jwt;
};

const validateToken = (token) => {
  let parts = token.split('.');
  let valid = jws.verify(parts[2], 'HS256', config.get('jwt.secret'));

  if (valid) {
    let body = JSON.parse(fromBase64(parts[1]));

    // check the expiry
    if (body.exp >= new Date().UTC()) {
      return false;
    }

    // check the claims if they exist

    return true;
  }

  return false;
};

module.exports = {
  createToken,
  validateToken
}