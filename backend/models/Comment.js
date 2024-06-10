const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  text: String,
  rating: Number
});

module.exports = mongoose.model('Comment', CommentSchema);
