const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: String,
  city: String,
  watchlist: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('User', UserSchema);
