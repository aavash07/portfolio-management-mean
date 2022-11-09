const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Stock } = require('../models/stock');

// localhost:3000/stocks/
router.get('/', (req, res) => {
  Stock.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        'Error in retriving stock: ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with id ' + req.params.id);

  Stock.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        'Error in getting stock: ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post('/', (req, res) => {
  var stock = new Stock({
    name: req.body.name,
  });
  stock.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in stock Save: ' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with id ' + req.params.id);

  var stock = {
    name: req.body.name,
  };

  Stock.findByIdAndUpdate(
    req.params.id,
    { $set: stock },
    { new: true },
    (err, docs) => {
      //new parameter declares we need the updated docs returned ie new
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          'Error in updating stock: ' + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with id ' + req.params.id);

  Stock.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        'Error in deleting stock: ' + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;
