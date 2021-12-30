const express = require('express');
const router = express.Router();

// @route    POST api/users
// @desc     Register a User
// @access   Public

router.post('/', (req, res) => {
  res.send('Register a User from users.js');
});

// @route    PUT api/users/:id
// @desc     Update users credentials
// @access   Public

router.put('/:id', (req, res) => {
  res.send('Update a User credentials from users.js');
});

module.exports = router;
