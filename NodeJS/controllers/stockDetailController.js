const express = require('express');
const stockDetail = require('../models/stock-detail');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { StockDetail } = require('../models/stock-detail');
var { Stock } = require('../models/stock');

// localhost:3000/stocks/
router.get('/', async (req, res) => {
  const stockDeatils = await StockDetail.find().populate('stock');
  if (!stockDeatils.length)
    return res.status(403).json({ message: 'No data in dataBase' });

  return res.status(200).json({ message: 'Success', data: stockDeatils });
});

router.get('/profit', async (req, res) => {
  totalUnits = 0;
  totalInvestment = 0;
  soldAmount = 0;
  currentAmount = 0;
  profit = 0;

  boughtUnits = 0;
  soldUnits = 0;
  const stockDetails = await StockDetail.find().populate('stock');
  if (!stockDetails.length)
    return res.status(403).json({ message: 'No data in dataBase' });

  for (const stockDetail of stockDetails) {
    if (stockDetail.transactionType == 'buy') {
      totalInvestment += stockDetail.amount * stockDetail.quantity;
      boughtUnits += stockDetail.quantity;
    } else {
      soldAmount += stockDetail.amount * stockDetail.quantity;
      soldUnits += stockDetail.quantity;
    }
    totalUnits += stockDetail.quantity;
  }

  currentAmount =
    (boughtUnits - soldUnits) * stockDetails[stockDetails.length - 1].amount;
  profit = soldAmount - totalInvestment;
  return res.status(200).json({
    message: 'Success',
    data: {
      totalUnits: totalUnits,
      totalInvestment: totalInvestment,
      soldAmount: soldAmount,
      currentAmount: currentAmount,
      profit: profit,
    },
  });
});

router.get('/stock_profit/:stockId',(req, res) => {
  stockDeatils = StockDetail.find({"stock": ObjectId(`${req.params.stockId}`)});
  return res.status(200).json({data: stockDeatils});
})

router.get('/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with id ' + req.params.id);

  const stockDetail = await StockDetail.findById(req.params.id).populate(
    'stock'
  );
  if (!stockDetail) {
    return res.status(403).json({ message: 'No data in dataBase' });
  }

  return res.status(200).json({ message: 'Success', data: stockDetail });
});

router.post('/', (req, res) => {
  var stockDetail = new StockDetail({
    transactionType: req.body.transactionType,
    quantity: req.body.quantity,
    amount: req.body.amount,
    transactionDate: req.body.transactionDate,
    stock: req.body.stockId,
  });
  stockDetail.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        'Error in stock detail Save: ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with id ' + req.params.id);

  var stockDetail = {
    transactionType: req.body.transactionType,
    quantity: req.body.quantity,
    amount: req.body.quantity,
    transactionDate: req.body.quantity,
    stock: req.body.stockId,
  };

  StockDetail.findByIdAndUpdate(
    req.params.id,
    { $set: stockDetail },
    { new: true },
    (err, docs) => {
      //new parameter declares we need the updated docs returned ie new
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          'Error in updating stock detail: ' + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with id ' + req.params.id);

  StockDetail.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        'Error in deleting stock detail: ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;
