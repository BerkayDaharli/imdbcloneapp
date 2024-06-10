import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/movieService';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchResultsPage.css'; // Import the CSS file

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResultsPage = () => {
  const query = useQuery().get('query');
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchResults = async () => {
      const results = await searchMovies(query);
      setSearchResults(results);
      console.log(results); // Add this line to check the structure of the results
    };
    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleResultClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className="container mt-4">
      <h1>{t('searchResultsFor')} "{query}"</h1>
      {searchResults.length > 0 ? (
        <div className="row">
          {searchResults.map((result, index) => (
            <div key={result.imdbID} className="col-md-4 col-lg-3 mb-4">
              <div className="card">
                <div onClick={() => handleResultClick(result.imdbID)}>
                  <img src={result.Poster} className="card-img-top" alt={result.Title} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{index + 1}. {result.Title}</h5>
                  <p className="card-text">⭐ {result.imdbRating || 'N/A'}</p>
                  <a
                    href={`https://www.youtube.com/results?search_query=${result.Title}+trailer`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary black-text"
                  >
                    {t('watchTrailer')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{t('noResultsFound')}</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
