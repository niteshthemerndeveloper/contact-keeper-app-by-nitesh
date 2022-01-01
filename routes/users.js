const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { body, check, validationResult } = require('express-validator');

// @route     POST api/users
// @desc      Register a User on App
// @access    Public
router.post('/', [check('name').not().isEmpty()], (req, res) => {
  res.send(req.body);
});

// @route     PUT api/users/:id
// @desc      Update users Credentials on Server
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Password has been updated successfully on the server!');
});

module.exports = router;
