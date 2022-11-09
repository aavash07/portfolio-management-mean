const mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = { User: User };
