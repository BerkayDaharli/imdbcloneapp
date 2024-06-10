// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import WatchList from './components/WatchList'; // Import WatchList component
import Header from './components/Header';
import './global.css'; // Import the global CSS file

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <div className="container">
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/movie/:id" element={<MovieDetailPage />} />
                        <Route path="/search" element={<SearchResultsPage />} />
                        <Route path="/watchlist" element={<WatchList />} /> {/* Add WatchList route */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
