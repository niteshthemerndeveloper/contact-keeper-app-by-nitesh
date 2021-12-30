const express = require('express');
const router = express.Router();

// Read;

// @route     GET api/contacts
// @desc      Get all the users Contact
// @access    Private

router.get('/', (req, res) => {
  res.send('Sending the users contact from contacts.js');
});

// Create;

// @route     POST api/contacts
// @desc      Add a Contact
// @access    Private

router.post('/', (req, res) => {
  res.send('Adding users contact to the server from contacts.js');
});

// Update;

// @route     PUT api/contacts/:id
// @desc      Update a Contact
// @access    Private

router.put('/:id', (req, res) => {
  res.send('Updating users contact on the server from contacts.js');
});

// Delete;

// @router     DELETE api/contacts/:id
// @desc       Delete users Contact
// @access     Private

router.delete('/:id', (req, res) => {
  res.send('Deleting users contact from the server from contacts.js');
});

module.exports = router;
