const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
const Game = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  platform: { type: Array, required: true },
  releaseDate: { type: Date, required: true },
  developer: { type: String, required: true },
  genre: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('games', Game);