const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('db connected');
})

const db = mongoose.connection;

module.exports = db;