const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middleware/middlewareAuth.js');
const Contact = require('../models/Contact.js');
const User = require('../models/User.js');
const { check, validationResult } = require('express-validator');

// Contacts will perform CRUD operations;

// @route     GET api/contacts
// @desc      Get users contacts from server
// @access    Private
router.get('/', middlewareAuth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json({ contacts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Failed to Respond!');
  }
});

// @route     POST api/contacts
// @desc      Create users contacts on Server
// @access    Private
router.post(
  '/',
  [middlewareAuth, [check('name', 'Please enter a name')]],
  async (req, res) => {
    const errors = validationResult(req);

    // if errors not empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = await new Contact({
        email,
        name,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json({ contact });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Failed to Respond! ');
    }
  }
);

// @route     PUT api/contacts/:id
// @desc      Update users contacts on Server
// @access    Private
router.put('/:id', middlewareAuth, async (req, res) => {
  const { email, name, phone, type } = req.body;

  const contactFields = {};
  if (email) contactFields.email = email;
  if (name) contactFields.name = name;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: 'Contact Not Found' });
    }

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json({ contact });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Failed to Respond!');
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete users contacts from server
// @access    Private
router.delete('/:id', middlewareAuth, async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  try {
    if (!contact) {
      return res.status(404).json({ msg: 'Not Found' });
    }
    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'User contact deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Failed to Respond!');
  }
});

module.exports = router;
