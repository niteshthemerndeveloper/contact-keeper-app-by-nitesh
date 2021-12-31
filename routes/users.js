const express = require('express');
const router = express.Router();

// @route     POST api/users
// @desc      Register a User on App
// @access    Public
router.post('/', (req, res) => {
  res.send('Users account has been successfully registered! users.js');
});

// @route     PUT api/users/:id
// @desc      Update users Credentials on Server
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Password has been updated successfully on the server!');
});

module.exports = router;
