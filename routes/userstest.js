const express = require('express');
const bodyParser = require('body-parser');

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

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.use((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted:\n');
  res.end(JSON.stringify(req.body, null, 2));
  console.log(req.body);
});

module.exports = router;
