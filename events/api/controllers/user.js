const user = require('../lib/user');

const login = async (req, res) => {
  let data = req.swagger.params.body.value,;

  let output = await user.login(data);
  res.json(output);
};

module.exports = {
  login
}