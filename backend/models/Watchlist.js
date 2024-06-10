// models/Watchlist.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
  email: { type: String, required: true, unique: true },
  imdbIDs: { type: [String], required: true }
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);
