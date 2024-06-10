const Movie = require('../models/Movie');
const axios = require('axios');

const OMDB_API_KEY = '2d5488dc'; // Your OMDb API key
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

// Get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new movie
exports.addMovie = async (req, res) => {
  const { imdbID, Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, Ratings, Metascore, imdbRating, imdbVotes, Type, DVD, BoxOffice, Production, Website, Response } = req.body;
  
  try {
    const movie = new Movie({ imdbID, Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, Ratings, Metascore, imdbRating, imdbVotes, Type, DVD, BoxOffice, Production, Website, Response });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get movie details by IMDb ID
exports.getMovieDetails = async (req, res) => {
  const { imdbID } = req.params;
  
  try {
    // Check if the movie exists in the database
    let movie = await Movie.findOne({ imdbID });
    
    if (!movie) {
      // If not, fetch it from OMDb API
      const response = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}`);
      if (response.data && response.data.Response === 'True') {
        // Save the movie to the database
        movie = new Movie(response.data);
        await movie.save();
      } else {
        return res.status(404).json({ error: 'Movie not found' });
      }
    }

    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Search movies by query
exports.searchMovies = async (req, res) => {
  const { query } = req.params;
  
  try {
    const response = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${query}`);
    if (response.data && response.data.Response === 'True') {
      res.json(response.data);
    } else {
      res.status(404).json({ error: 'Movies not found' });
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
