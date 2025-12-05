import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onCategoryChange, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  
  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('');
    onSearch('');
    onCategoryChange('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-controls">
        <div className="search-input-group">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search products"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="filter-group">
          <label htmlFor="category-filter" className="filter-label">
            Filter by Category:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
            aria-label="Filter products by category"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {(searchTerm || selectedCategory) && (
        <div className="active-filters">
          <span className="active-filters-label">Active filters:</span>
          {searchTerm && (
            <span className="filter-tag">
              Search: "{searchTerm}"
              <button 
                onClick={() => setSearchTerm('')}
                className="remove-filter"
                aria-label="Remove search filter"
              >
                ×
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="filter-tag">
              Category: {selectedCategory}
              <button 
                onClick={() => setSelectedCategory('')}
                className="remove-filter"
                aria-label="Remove category filter"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;