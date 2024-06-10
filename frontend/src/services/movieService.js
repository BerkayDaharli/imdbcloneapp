import axios from 'axios';

const OMDB_API_KEY = '2d5488dc'; // Your OMDb API key
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

const YOUTUBE_API_KEY = 'AIzaSyARJFJqqWewoRGc4aCOzfgEJhp9o4bKv_8'; // Replace with your YouTube API key
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const fetchMovies = async (query = 'movie', count = 10) => {
  const response = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${query}`);
  if (response.data.Search) {
    const moviePromises = response.data.Search.slice(0, count).map(movie =>
      axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`)
    );
    const movieResponses = await Promise.all(moviePromises);
    return movieResponses.map(res => res.data);
  }
  return [];
};

export const searchMovies = async (query, count = 3) => {
  const response = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${query}`);
  if (response.data.Search) {
    const moviePromises = response.data.Search.slice(0, count).map(movie =>
      axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`)
    );
    const movieResponses = await Promise.all(moviePromises);
    return movieResponses.map(res => res.data);
  }
  return [];
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}`);
  return response.data;
};

export const fetchTrailer = async (title) => {
  try {
    const query = `${title} trailer`;
    const response = await axios.get(`${YOUTUBE_BASE_URL}?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}`);
    if (response.data.items && response.data.items.length > 0) {
      return `https://www.youtube.com/embed/${response.data.items[0].id.videoId}`;
    }
    throw new Error('No trailer found');
  } catch (error) {
    console.error('Error fetching trailer:', error);
    throw error; // Propagate the error so it can be handled in the component
  }
};

const calculatePopularity = (data) => {
  const rating = parseFloat(data.imdbRating) || 0;
  const votes = parseInt(data.imdbVotes.replace(/,/g, '')) || 0;

  // Normalize rating (assuming IMDb rating is out of 10)
  const normalizedRating = (rating / 10) * 100;

  // Normalize votes (let's assume max votes considered is 1,000,000 for normalization)
  const normalizedVotes = Math.min((votes / 1000000) * 100, 100);

  // Combine the factors to get a final popularity score
  const popularity = (normalizedRating * 0.7) + (normalizedVotes * 0.3); // Adjust weights as necessary

  return popularity.toFixed(2);
};

export const fetchPopularity = async (imdbID) => {
  const response = await axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}`);
  if (response.data && response.data.Response === 'True') {
    const popularity = calculatePopularity(response.data);
    return popularity;
  }
  return 'N/A';
};
