import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieSlider from '../components/MovieSlider';
import { useTranslation } from 'react-i18next';
import { fetchMovies, searchMovies } from '../services/movieService';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      const initialMovies = await fetchMovies();
      setMovies(initialMovies);
    };
    loadMovies();
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchText(query);
    if (query.length >= 3) {
      const results = await searchMovies(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/search?query=${searchText}`);
    }
  };

  const handleResultClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className="container mt-4">
      <h1>{t('home')}</h1>
      <div className="form-group">
        <input 
          type="text" 
          className="form-control" 
          value={searchText} 
          onChange={handleSearch} 
          onKeyDown={handleSearchSubmit} // Handle Enter key press
          placeholder={t('search')} 
        />
        {searchResults.length > 0 && (
          <div className="dropdown-menu show">
            {searchResults.map((result) => (
              <div 
                className="dropdown-item d-flex align-items-center" 
                key={result.imdbID} 
                onClick={() => handleResultClick(result.imdbID)}
              >
                <img 
                  src={result.Poster} 
                  alt={result.Title} 
                  style={{ width: '50px', height: '75px', marginRight: '10px' }}
                />
                <span>{result.Title} - {result.Year}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2>{t('topMovies')}</h2>
      {movies.length > 0 ? (
        
        <MovieSlider movies={movies} />
        
      ) : (
        <p>{t('noMovies')}</p>
      )}
    </div>
  );
};

export default HomePage;
