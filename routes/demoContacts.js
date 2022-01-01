const express = require('express');
const router = express.Router();
const DemoContact = require('../models/DemoContact.js');
const config = require('config');
const jwt = require('jsonwebtoken');
const { body, check, validationResult } = require('express-validator');
const middlewareAuth = require('../middleware/middlewareAuth.js');

// @route     GET api/demo
// @desc      Get Demo Contacts
// @access    Private to the IP/Connection
router.get('/', middlewareAuth, (req, res) => {
  res.send('Demo Contacts have been sent.');
});

// @route     POST api/demo
// @desc      Create Demo Contacts
// @access    Public
router.post(
  '/',
  [
    check('name', 'Please Enter your Name').notEmpty(),
    check('mobile', 'Please include a valid Mobile').isNumeric(),
    check('purpose', 'Please include a purpose').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, mobile, purpose } = req.body;
    try {
      let demoContacts = await DemoContact.findOne({ mobile });

      if (demoContacts) {
        return res.status(400).json({ msg: 'Mobile is already exist!' });
      }
      demoContacts = await new DemoContact({
        name,
        mobile,
        purpose,
      });

      await demoContacts.save();

      // send jwt token;
      const payload = {
        demo: {
          id: demoContacts.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Failed to Respond.');
    }
  }
);

// @route     PUT api/demo/:id
// @desc      Update Demo Contacts
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update Demo Contacts on the Server.');
});

// @route     DELETE api/demo/:id
// @desc      Delete Demo Contacts
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Deleting Demo Contacts on the Server.');
});

module.exports = router;
