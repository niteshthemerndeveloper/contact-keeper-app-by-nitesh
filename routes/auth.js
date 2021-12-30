const express = require('express');
const router = express.Router();

// @route     GET api/auth
// @desc      Get the logged in User
// @access    Private

router.get('/', (req, res) => {
  res.send('Get Request Created at Auth.js');
});

// @route     POST api/auth
// @desc      Log in the User
// @access    Public

router.post('/', (req, res) => {
  res.send('Congrats! You have logged in Successfully from auth.js');
});

module.exports = router;
