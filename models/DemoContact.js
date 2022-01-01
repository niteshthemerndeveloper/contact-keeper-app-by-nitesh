const mongoose = require('mongoose');
const { Schema } = mongoose;

const DemoContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('DemoContact', DemoContactSchema);
