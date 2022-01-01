const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get Token from header
  const authToken = req.header('x-auth-token');

  // check if not token
  if (!authToken) {
    return res.status(401).json({ msg: 'No Token, Authorization Denied.' });
  }

  try {
    const decodedToken = jwt.verify(authToken, config.get('jwtSecret'));

    req.demo = decodedToken.demo;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
