const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  phone: { type: String },
  password: { type: String, required: true }
});

module.exports = mongoose.model('user', User);
