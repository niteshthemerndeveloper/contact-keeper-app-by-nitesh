const express = require('express');
const router = express.Router();

// @route     GET api/auth
// @desc      Get the Logged in User
// @access    Private
router.get('/', (req, res) => {
  res.send('Get the logged in User from auth.js');
});

// @route     POST api/auth
// @desc      Verify & Login a User
// @access    Public
router.post('/', (req, res) => {
  res.send('Login a user from auth.js');
});

module.exports = router;
