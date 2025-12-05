import React, { useState, useEffect } from 'react';
import './EnquiryForm.css';

const EnquiryForm = ({ product, onSubmit, onClose, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      
      case 'phone':
        if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) return 'Invalid phone number';
        if (value && value.replace(/\D/g, '').length < 10) return 'Phone number must have at least 10 digits';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 500) return 'Message cannot exceed 500 characters';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit({
          ...formData,
          product_id: product?.id
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isFormValid = () => {
    return Object.values(errors).every(error => !error) && 
           Object.values(formData).every(value => value || value === '');
  };

  const characterCount = formData.message.length;
  const maxCharacters = 500;

  return (
    <div 
      className="enquiry-form-overlay" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-form-title"
    >
      <div className="enquiry-form-modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="form-close-button" 
          onClick={onClose}
          aria-label="Close enquiry form"
        >
          &times;
        </button>
        
        <div className="enquiry-form-header">
          <h2 id="enquiry-form-title">
            {product ? `Enquire About: ${product.name}` : 'Make an Enquiry'}
          </h2>
          {product && (
            <p className="product-reference">
              Product Reference: <strong>PROD-{product.id.toString().padStart(4, '0')}</strong>
            </p>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
              required
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <div id="name-error" className="error-message" role="alert">
                ⚠️ {errors.name}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email address"
              required
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <div id="email-error" className="error-message" role="alert">
                ⚠️ {errors.email}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
              <span className="optional"> (Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="Enter your phone number"
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <div id="phone-error" className="error-message" role="alert">
                ⚠️ {errors.phone}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              placeholder="Please provide details about your enquiry, including any specific requirements or questions..."
              rows="5"
              required
              disabled={isSubmitting}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error message-counter' : 'message-counter'}
            />
            <div className="textarea-footer">
              <div className="character-counter">
                <span className={`counter ${characterCount > maxCharacters ? 'error' : ''}`}>
                  {characterCount}/{maxCharacters}
                </span>
              </div>
              {errors.message && (
                <div id="message-error" className="error-message" role="alert">
                  ⚠️ {errors.message}
                </div>
              )}
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting || !isFormValid()}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>
          </div>
          
          <div className="form-note">
            <p>📝 All fields marked with * are required.</p>
            <p>⏰ We typically respond within 24 hours.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;