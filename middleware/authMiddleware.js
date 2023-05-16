const basicAuth = require('basic-auth');

const authenticate = (req, res, next) => {
  const credentials = basicAuth(req);

  if (!credentials || !isValidCredentials(credentials.name, credentials.pass)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Weather App"');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

const isValidCredentials = (username, password) => {
  // Replace with your own authentication logic
  const validUsername = 'admin';
  const validPassword = 'password';

  return username === validUsername && password === validPassword;
};

module.exports = authenticate;
