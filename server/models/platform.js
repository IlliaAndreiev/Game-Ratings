const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const Platform = new Schema({
  className: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('platforms', Platform);