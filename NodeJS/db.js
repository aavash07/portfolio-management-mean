const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/portfolioManagement', (err)=>{
    if (!err)
        console.log('MongoDB connection established...');
    else
        console.log('Error connecting to MongoDB: ' + JSON.stringify(err, undefined, 2));

});

module.export = mongoose;