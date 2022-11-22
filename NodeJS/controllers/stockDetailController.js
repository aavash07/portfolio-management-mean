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

router.get('/stock_profit', async (req, res) => {
  const stocks = await Stock.find();
  if (!stocks.length)
    return res.status(403).json({ message: 'No data in dataBase' });

  stockProfit = [];

  for (const stock of stocks) {
    totalUnits = 0;
    totalInvestment = 0;
    soldAmount = 0;
    currentAmount = 0;
    profit = 0;
    boughtUnits = 0;
    soldUnits = 0;
    const stockDetails = await StockDetail.find().populate({
      path: 'stock',
      match: { id: `${stock._id}` },
    });
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
    stockProfit.push({
      totalUnits: totalUnits,
      totalInvestment: totalInvestment,
      soldAmount: soldAmount,
      currentAmount: currentAmount,
      profit: profit,
      stockName: stock.name,
    });
  }

  return res.status(200).json({
    message: 'Success',
    data: stockProfit,
  });
});

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

router.post('/', async (req, res) => {
  let buyStockDetails = await StockDetail.find(
    { stock: req.body.stockDetail.stockId, transactionType: 'buy' },
    { quantity: 1, _id: 0 }
  );
  buyStockDetails = buyStockDetails
    .map((a) => a.quantity)
    .reduce((a, b) => a + b, 0);
  let sellStockDetails = await StockDetail.find(
    { stock: req.body.stockDetail.stockId, transactionType: 'sell' },
    { quantity: 1, _id: 0 }
  );
  sellStockDetails = sellStockDetails
    .map((a) => a.quantity)
    .reduce((a, b) => a + b, 0);
  if (req.body.stockDetail.transactionType == 'sell') {
    sellStockDetails += req.body.stockDetail.quantity;
    if (sellStockDetails > buyStockDetails)
      return res
        .status(400)
        .send({ message: 'Cannot Sell Stock More than existing quantity' });
  }
  var stockDetail = new StockDetail({
    transactionType: req.body.stockDetail.transactionType,
    quantity: req.body.stockDetail.quantity,
    amount: req.body.stockDetail.amount,
    transactionDate: req.body.stockDetail.transactionDate,
    stock: req.body.stockDetail.stockId,
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
    transactionType: req.body.stockDetail.transactionType,
    quantity: req.body.stockDetail.quantity,
    amount: req.body.stockDetail.amount,
    transactionDate: req.body.stockDetail.transactionDate,
    stock: req.body.stockDetail.stockId,
  };

  StockDetail.findByIdAndUpdate(
    req.params.id,
    { $set: stockDetail },
    { new: true },
    (err, docs) => {
      //new parameter declares we need the updated docs returned ie new
      if (!err) {
        return res.status(200).json({ message: 'Success', data: docs });
      } else {
        return res.status(400).json({ message: `Error in updating stock detail` });
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
