// controllers/watchlistController.js
const Watchlist = require('../models/Watchlist');
const axios = require('axios');
const OMDB_API_KEY = '2d5488dc'; // Replace with your OMDb API key

exports.getWatchlist = async (req, res) => {
  try {
    console.log('Request user in getWatchlist:', req.user); // Log the request user
    const userWatchlist = await Watchlist.findOne({ email: req.user.email });
    if (!userWatchlist) {
      return res.status(404).json({ error: 'Watchlist not found' });
    }

    const movieDetailsPromises = userWatchlist.imdbIDs.map(imdbID =>
      axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}`)
    );
    const movieDetailsResponses = await Promise.all(movieDetailsPromises);
    const movies = movieDetailsResponses.map(response => response.data);

    res.json(movies);
  } catch (error) {
    console.error('Error fetching watchlist:', error); // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addToWatchlist = async (req, res) => {
  const { imdbID } = req.body;
  try {
    console.log('Request user in addToWatchlist:', req.user); // Log the request user
    let userWatchlist = await Watchlist.findOne({ email: req.user.email });
    if (!userWatchlist) {
      userWatchlist = new Watchlist({ email: req.user.email, imdbIDs: [] });
    }

    if (!userWatchlist.imdbIDs.includes(imdbID)) {
      userWatchlist.imdbIDs.push(imdbID);
      await userWatchlist.save();
      res.status(200).json({ message: 'Movie added to watchlist' });
    } else {
      res.status(400).json({ error: 'Movie already in watchlist' });
    }
  } catch (error) {
    console.error('Error adding to watchlist:', error); // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  const { imdbID } = req.body;
  try {
    console.log('Request user in removeFromWatchlist:', req.user); // Log the request user
    const userWatchlist = await Watchlist.findOne({ email: req.user.email });
    if (!userWatchlist) {
      return res.status(404).json({ error: 'Watchlist not found' });
    }

    userWatchlist.imdbIDs = userWatchlist.imdbIDs.filter(id => id !== imdbID);
    await userWatchlist.save();
    res.status(200).json({ message: 'Movie removed from watchlist' });
  } catch (error) {
    console.error('Error removing from watchlist:', error); // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
};

// controllers/watchlistController.js
exports.isInWatchlist = async (req, res) => {
    const { imdbID } = req.params;
    try {
      const userWatchlist = await Watchlist.findOne({ email: req.user.email });
      if (userWatchlist && userWatchlist.imdbIDs.includes(imdbID)) {
        return res.json({ inWatchlist: true });
      }
      return res.json({ inWatchlist: false });
    } catch (error) {
      console.error('Error checking watchlist status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  