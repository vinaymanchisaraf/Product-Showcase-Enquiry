import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, onViewDetails }) => {
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <div className="no-products-icon">🔍</div>
        <h3>No Products Found</h3>
        <p>Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-count">
        Showing <strong>{products.length}</strong> product{products.length !== 1 ? 's' : ''}
      </div>
      <div className="product-list">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;