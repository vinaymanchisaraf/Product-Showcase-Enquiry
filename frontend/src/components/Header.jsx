import React from 'react';
import './Header.css';

const Header = ({ currentPage, onPageChange }) => {
  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="logo">
          <h1>🛍️ Product Showcase</h1>
          <p className="tagline">Discover & Enquire About Amazing Products</p>
        </div>
        
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <ul className="nav-list">
            <li>
              <button
                className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => onPageChange('home')}
                aria-current={currentPage === 'home' ? 'page' : undefined}
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${currentPage === 'admin' ? 'active' : ''}`}
                onClick={() => onPageChange('admin')}
                aria-current={currentPage === 'admin' ? 'page' : undefined}
              >
                <span className="nav-icon">📊</span>
                <span className="nav-text">Admin Dashboard</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;