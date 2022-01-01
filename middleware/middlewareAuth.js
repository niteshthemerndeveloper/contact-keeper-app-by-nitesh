const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get the token from header
  const authToken = req.header('x-auth-token');

  // Check if not token
  if (!authToken) {
    return res.status(401).json({ msg: 'No Token, Authorization Denied.' });
  }

  // verify token
  try {
    const payloadDecoded = jwt.verify(authToken, config.get('jwtSecret'));

    req.user = payloadDecoded.user;
    next();
  } catch (err) {
    if (err) {
      return res.status(401).json({ msg: 'Not a valid Token' });
    }
  }
};
