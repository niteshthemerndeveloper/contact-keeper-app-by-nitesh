const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err.message);
    // Exit Process with failure;
    process.exit(1);
  }
};

module.exports = connectDB;
