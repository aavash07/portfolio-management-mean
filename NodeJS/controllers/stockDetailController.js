const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { StockDetail } = require('../models/stock-detail');

// localhost:3000/stocks/
router.get('/', (req, res) => {
  StockDetail.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        'Error in retriving stock details: ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with id ' + req.params.id);

  StockDetail.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        'Error in getting stock details: ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post('/', (req, res) => {
  var StockDetail = new Stock({
    transactionType: req.body.transactionType,
    quantity: req.body.quantity,
    amount: req.body.quantity,
    transactionDate: req.body.quantity,
    stock: req.body.stock_id,
  });
  StockDetail.save((err, docs) => {
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

  var StockDetail = {
    transactionType: req.body.transactionType,
    quantity: req.body.quantity,
    amount: req.body.quantity,
    transactionDate: req.body.quantity,
    stock: req.body.stock_id,
  };

  StockDetail.findByIdAndUpdate(
    req.params.id,
    { $set: StockDetail },
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
