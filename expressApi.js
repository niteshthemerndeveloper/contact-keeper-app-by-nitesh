const express = require('express');
const app = express();

// Define Routes;

app.use('/api/users', require('./routes/userstest.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on the ${'PORT ' + PORT}`));
