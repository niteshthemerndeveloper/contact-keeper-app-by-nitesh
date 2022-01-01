const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User.js');
const middlewareAuth = require('../middleware/middlewareAuth.js');

// @route     GET api/auth
// @desc      Get the Logged in User
// @access    Private
router.get('/', middlewareAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Failed to Respond!');
  }
});

// @route     POST api/auth
// @desc      Verify & Login a User
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check if errors not empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { email, password } = req.body;

    try {
      // Check users details
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ msg: 'Invalid Credentials! U' });
      }

      // if exist then Check users password
      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ msg: 'Invalid Credentials! P' });
      }

      // user verified -> send jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Failed to Respond!');
    }
  }
);

module.exports = router;
