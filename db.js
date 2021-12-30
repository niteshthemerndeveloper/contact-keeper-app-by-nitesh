const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/users');
  console.log('MongoDB connected...');
};

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('contact', userSchema);

const user = new User({
  name: 'Nitesh',
  email: 'superActive@trymail.com',
  password: 'Nitesh30@#',
});

// contact.save().then((err) => console.log("MongoDB Connected..."));

connectDB();
