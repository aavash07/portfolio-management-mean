const mongoose = require('mongoose');

var StockDetail = mongoose.model('StockDetail', {
  transactionType: { type: String },
  quantity: { type: Number },
  amount: { type: Number },
  transactionDate: { type: Date },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock',
    required: true,
  },
});

module.exports = { StockDetail: StockDetail };
