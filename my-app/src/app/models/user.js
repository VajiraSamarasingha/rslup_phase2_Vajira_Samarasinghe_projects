const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: String,
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
