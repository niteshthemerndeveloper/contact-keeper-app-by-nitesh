const express = require('express');
const router = express.Router();

// Contacts will perform CRUD operations;

// @route     GET api/contacts
// @desc      Get users contacts from server
// @access    Private
router.get('/', (req, res) => {
  res.send('Sending users contacts to the Client from contacts.js');
});

// @route     POST api/contacts
// @desc      Create users contacts on Server
// @access    Private
router.post('/', (req, res) => {
  res.send('Creating users contacts on server from contacts.js');
});

// @route     PUT api/contacts/:id
// @desc      Update users contacts on Server
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Updating users contacts on server from contacts.js');
});

// @route     DELETE api/contacts/:id
// @desc      Delete users contacts from server
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Deleting users contacts from server.');
});

module.exports = router;
