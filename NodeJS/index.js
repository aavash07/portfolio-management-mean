const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var stockController = require('./controllers/stockController.js');
var stockDetailController = require('./controllers/stockDetailController.js');
var userController = require('./controllers/userController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => console.log('Server listening on port: 3000'));

app.use('/stocks', stockController);
app.use('/stock_details', stockDetailController);
app.use('/users', userController);
