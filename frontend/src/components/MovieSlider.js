import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';  // Ensure the CSS file is imported

const MovieSlider = ({ movies }) => {
  const { t } = useTranslation();

  return (
    <div className="container mt-4">
      <div className="row">
        {movies.map((movie, index) => (
          <div key={movie.imdbID} className="col-md-4 col-lg-3 mb-4">
            <div className="card">
              <Link to={`/movie/${movie.imdbID}`}>
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{index + 1}. {movie.Title}</h5>
                <p className="card-text">⭐ {movie.imdbRating}</p>
                <a href={`https://www.youtube.com/results?search_query=${movie.Title}+trailer`} target="_blank" rel="noopener noreferrer" className="btn btn-primary black-text">{t('watchTrailer')}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
