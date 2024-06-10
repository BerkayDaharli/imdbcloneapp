// src/components/WatchList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MovieSlider from './MovieSlider'; // Import MovieSlider component

const WatchList = () => {
    const [watchList, setWatchList] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            axios.get('/watchlist')
                .then(response => {
                    setWatchList(response.data);
                })
                .catch(error => {
                    console.error('Error fetching watchlist:', error);
                });
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="container mt-4">
            <h1>My Watchlist</h1>
            {watchList.length > 0 ? (
                <MovieSlider movies={watchList} /> // Use MovieSlider component
            ) : (
                <p>No movies in your watchlist</p>
            )}
        </div>
    );
};

export default WatchList;
