const express = require('express');
const app = express();
const connectDB = require('./config/db.js');

// connect with MongoDB Atlas;
connectDB();

// Define Routes;
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/contacts', require('./routes/contacts.js'));
app.use('/api/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on the PORT ${PORT}`));
