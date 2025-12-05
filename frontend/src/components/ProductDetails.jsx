import React, { useEffect } from 'react';
import './ProductDetails.css';

const ProductDetails = ({ product, onClose, onSubmitEnquiry }) => {
  useEffect(() => {
    
    document.body.style.overflow = 'hidden';
    
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!product) return null;

  const handleEnquiryClick = () => {
    onClose();
    setTimeout(() => {
      onSubmitEnquiry(product);
    }, 100);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div 
      className="product-details-overlay" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-details-title"
    >
      <div className="product-details-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-button" 
          onClick={handleCloseClick}
          aria-label="Close product details"
        >
          &times;
        </button>
        
        <div className="product-details-content">
          <div className="product-details-image-section">
            <div className="product-main-image">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="product-details-image"
              />
            </div>
            <div className="product-image-badge">
              <span className="badge-category">{product.category}</span>
              <span className="badge-stock">In Stock</span>
            </div>
          </div>
          
          <div className="product-details-info-section">
            <div className="product-header">
              <h1 id="product-details-title" className="product-details-name">
                {product.name}
              </h1>
              <div className="product-rating-section">
                <div className="rating-stars">
                  {'★★★★☆'.split('').map((star, i) => (
                    <span key={i} className="star">{star}</span>
                  ))}
                </div>
                <span className="rating-text">4.0 (128 reviews)</span>
              </div>
            </div>
            
            <div className="product-price-section">
              <div className="current-price">${product.price.toFixed(2)}</div>
              <div className="price-note">Inclusive of all taxes</div>
            </div>
            
            <div className="product-description-section">
              <h3 className="section-title">Product Description</h3>
              <div className="description-content">
                {product.long_desc.split('\n').map((paragraph, index) => (
                  <p key={index} className="description-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="product-features-section">
              <h3 className="section-title">Key Features</h3>
              <ul className="features-list">
                <li>Premium quality materials and construction</li>
                <li>1-year manufacturer warranty included</li>
                <li>Free shipping on all orders</li>
                <li>30-day return policy</li>
                <li>24/7 customer support</li>
                <li>Eco-friendly packaging</li>
              </ul>
            </div>
            
            <div className="product-actions">
              <button 
                className="enquire-button primary"
                onClick={handleEnquiryClick}
                aria-label={`Make an enquiry about ${product.name}`}
              >
                <span className="button-icon">✉️</span>
                Make an Enquiry
              </button>
              <button 
                className="enquire-button secondary"
                onClick={handleCloseClick}
                aria-label="Continue shopping"
              >
                Continue Shopping
              </button>
            </div>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">SKU:</span>
                <span className="meta-value">PROD-{product.id.toString().padStart(4, '0')}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Availability:</span>
                <span className="meta-value available">In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;