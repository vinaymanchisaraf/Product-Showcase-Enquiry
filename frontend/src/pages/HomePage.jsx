import React, { useState, useEffect, useCallback } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import ProductDetails from '../components/ProductDetails';
import EnquiryForm from '../components/EnquiryForm';
import { fetchProducts, fetchCategories, submitEnquiry } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  
  const limit = 6;

  // Define loadProducts with useCallback to avoid dependency issues
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchProducts({
        page: currentPage,
        limit: limit,
        search: searchTerm,
        category: selectedCategory
      });
      
      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);
      setTotalProducts(data.pagination.total);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory]);

  const loadCategories = useCallback(async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [loadProducts, loadCategories]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const handleEnquiryClick = (product) => {
    setEnquiryProduct(product);
    setShowEnquiryForm(true);
    setEnquirySuccess(false);
  };

  const handleCloseEnquiryForm = () => {
    setShowEnquiryForm(false);
    setEnquiryProduct(null);
  };

  const handleSubmitEnquiry = async (enquiryData) => {
    try {
      setEnquiryLoading(true);
      await submitEnquiry(enquiryData);
      setEnquirySuccess(true);
      
      // Close form after success
      setTimeout(() => {
        setShowEnquiryForm(false);
        setEnquiryProduct(null);
      }, 2000);
    } catch (err) {
      throw err; // Let the form handle the error
    } finally {
      setEnquiryLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <h2>Explore Our Products</h2>
        <p>Browse our curated collection of premium products</p>
      </div>

      <div className="filters-section">
        <SearchBar 
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          categories={categories}
        />
        
        {(searchTerm || selectedCategory) && (
          <div className="filters-summary">
            <button 
              onClick={handleClearFilters}
              className="clear-filters-button"
              aria-label="Clear all filters"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            onClick={loadProducts}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <ProductList 
            products={products}
            onViewDetails={handleViewDetails}
          />
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={handleCloseDetails}
          onSubmitEnquiry={handleEnquiryClick}
        />
      )}

      {showEnquiryForm && (
        <EnquiryForm
          product={enquiryProduct}
          onSubmit={handleSubmitEnquiry}
          onClose={handleCloseEnquiryForm}
          isLoading={enquiryLoading}
        />
      )}

      {enquirySuccess && (
        <div className="success-message-overlay">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Enquiry Submitted Successfully!</h3>
            <p>Thank you for your interest. We'll contact you shortly.</p>
          </div>
        </div>
      )}

      <div className="page-footer">
        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">{totalProducts}</div>
            <div className="stat-label">Total Products</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{categories.length}</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;