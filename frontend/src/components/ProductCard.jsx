import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onViewDetails }) => {
  const handleClick = () => {
    onViewDetails(product);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onViewDetails(product);
    }
  };

  return (
    <div 
      className="product-card"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex="0"
      role="button"
      aria-label={`View details for ${product.name}, priced at $${product.price}`}
    >
      <div className="product-image-container">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <div className="product-category-badge">
          {product.category}
        </div>
      </div>
      
      <div className="product-content">
        <div className="product-header">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>
        </div>
        
        <p className="product-description">
          {product.short_desc}
        </p>
        
        <div className="product-footer">
          <div className="product-meta">
            <span className="product-rating">★★★★☆</span>
            <span className="product-stock">In Stock</span>
          </div>
          <button 
            className="product-action-button"
            aria-label={`Quick view of ${product.name}`}
          >
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;