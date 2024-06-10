// src/pages/MovieDetailPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchTrailer, fetchPopularity } from '../services/movieService';
import api from '../services/api'; // Use the configured Axios instance
import { AuthContext } from '../context/AuthContext';
import './MovieDetailPage.css';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState('');
  const [trailerError, setTrailerError] = useState(false);
  const [popularity, setPopularity] = useState('');
  const [inWatchlist, setInWatchlist] = useState(false); // Track watchlist status
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
        try {
          const trailerUrl = await fetchTrailer(movieData.Title);
          setTrailer(trailerUrl);
        } catch (error) {
          setTrailerError(true);
        }
        const popularityData = await fetchPopularity(movieData.imdbID);
        setPopularity(popularityData);

        // Check if the movie is in the user's watchlist
        if (isLoggedIn) {
          const response = await api.get(`/watchlist/check/${movieData.imdbID}`);
          setInWatchlist(response.data.inWatchlist);
        }
      } catch (error) {
        console.error('Error loading movie details:', error);
      }
    };

    loadMovieDetails();
  }, [id, isLoggedIn]);

  const handleAddToWatchlist = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      api.post('/watchlist/add', { imdbID: movie.imdbID })
        .then(response => {
          setInWatchlist(true);
        })
        .catch(error => {
          console.error('Error adding movie to watchlist:', error);
        });
    }
  };

  const handleRemoveFromWatchlist = () => {
    api.post('/watchlist/remove', { imdbID: movie.imdbID })
      .then(response => {
        setInWatchlist(false);
      })
      .catch(error => {
        console.error('Error removing movie from watchlist:', error);
      });
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail-container">
      <h1 className="movie-title">{movie.Title}</h1>
      <h2 className="info">
        <span className="movie-rating">IMDb Rating⭐({movie.imdbRating}/10)</span>
        {popularity && <span className="movie-popularity">Popularity: {popularity}</span>}
      </h2>
      <div className="movie-content">
        <div className="movie-poster-container">
          <img className="movie-poster" src={movie.Poster} alt={`${movie.Title} poster`} />
        </div>
        <div className="movie-trailer">
          {trailer ? (
            <iframe
              src={trailer}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : trailerError ? (
            <p>Couldn't load the trailer</p>
          ) : (
            <p>Loading trailer...</p>
          )}
        </div>
      </div>
      {isLoggedIn && (
        <>
          {inWatchlist ? (
            <button className="remove" onClick={handleRemoveFromWatchlist}>Remove from my watchlist</button>
          ) : (
            <button onClick={handleAddToWatchlist}>Add to my watchlist</button>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDetailPage;
