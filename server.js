const express = require('express');
const ConnectDB = require('./config/db.js');

const app = express();

// Connect Database;
ConnectDB();

// Init Middleware;

const PORT = process.env.PORT || 5000;

app.get('/api/users', (req, res) => {
  res.send('Have shared the data');
});

app.post('/api/users/post', (req, res) => {
  res.send('Thank you for your Response');
});

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
