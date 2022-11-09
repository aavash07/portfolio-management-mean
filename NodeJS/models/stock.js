const mongoose = require('mongoose');

var Stock = mongoose.model('Stock', {
  name: { type: 'string' },
});

module.exports = { Stock: Stock };
