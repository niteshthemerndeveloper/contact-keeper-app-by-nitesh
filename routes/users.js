const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

// @route     POST api/users
// @desc      Register a User on App
// @access    Public
router.post(
  '/',
  [
    check('name', 'Please enter your name').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Check data scope and certainty.
    const errors = validationResult(req);

    // Check if errors not empty
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    try {
      const { email, name, password } = req.body;
      let user = await User.findOne({ email });

      // Check if user already exist
      if (user) {
        return res
          .status(400)
          .json({ msg: 'User Already Registered! Please try Login.' });
      }

      // Create a user
      user = await new User({
        email,
        name,
        password,
      });

      // Hash the users Password
      const salt = await bcryptjs.genSalt(10);

      user.password = await bcryptjs.hash(password, salt);

      await user.save();

      // Create payload for jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Send the jwt token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.send(500).send('Server Failed to Respond!');
    }
  }
);

// @route     PUT api/users/:id
// @desc      Update users Credentials on Server
// @access    Private
router.put(
  '/:id',
  [check('email', 'Please enter a valid email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ msg: 'User does not exist.' });
      }
      res.status(200).send('An email has been sent to rest the password.');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Failed to Respond. Please check later.');
    }
  }
);

module.exports = router;
