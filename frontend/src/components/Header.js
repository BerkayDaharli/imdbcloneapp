// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useContext(AuthContext);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{t('home')}</Link>
        <div className="collapse navbar-collapse justify-content-between">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hello, {username}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/watchlist">My Watchlist</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">{t('login')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">{t('register')}</Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light me-2" onClick={() => handleLanguageChange('en')}>EN</button>
            <button className="btn btn-outline-light" onClick={() => handleLanguageChange('tr')}>TR</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
