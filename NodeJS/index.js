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

// This should be the last route else any after it won't work
app.use('*', (req, res) => {
    res.status(404).json({
      success: 'false',
      message: 'Page not found',
      error: {
        statusCode: 404,
        message: 'You reached a route that is not defined on this server',
      },
    });
  });
