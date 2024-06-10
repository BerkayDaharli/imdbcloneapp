const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  imdbID: { type: String, required: true, unique: true },
  Title: { type: String, required: true },
  Year: String,
  Rated: String,
  Released: String,
  Runtime: String,
  Genre: String,
  Director: String,
  Writer: String,
  Actors: String,
  Plot: String,
  Language: String,
  Country: String,
  Awards: String,
  Poster: String,
  Ratings: [{ Source: String, Value: String }],
  Metascore: String,
  imdbRating: String,
  imdbVotes: String,
  Type: String,
  DVD: String,
  BoxOffice: String,
  Production: String,
  Website: String,
  Response: String
});

module.exports = mongoose.model('Movie', MovieSchema);
