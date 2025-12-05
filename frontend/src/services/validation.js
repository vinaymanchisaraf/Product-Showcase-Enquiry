

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone);
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validateMessage = (message) => {
  return message && message.trim().length >= 10 && message.trim().length <= 500;
};

export const validateEnquiryForm = (formData) => {
  const errors = {};

  if (!validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!validateMessage(formData.message)) {
    errors.message = 'Message must be between 10 and 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};


export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
 
  const cleaned = phone.replace(/\D/g, '');
  
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1,4)}) ${cleaned.slice(4,7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};


export const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
};


export const capitalizeWords = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export const validatePrice = (price) => {
  if (typeof price !== 'number') return false;
  if (price < 0) return false;
  if (price > 1000000) return false; 
  return true;
};


export const validateProductData = (product) => {
  const errors = [];

  if (!product.name || product.name.trim().length < 3) {
    errors.push('Product name must be at least 3 characters');
  }

  if (!product.category || product.category.trim().length === 0) {
    errors.push('Category is required');
  }

  if (!product.short_desc || product.short_desc.trim().length < 10) {
    errors.push('Short description must be at least 10 characters');
  }

  if (!product.long_desc || product.long_desc.trim().length < 20) {
    errors.push('Long description must be at least 20 characters');
  }

  if (!validatePrice(product.price)) {
    errors.push('Price must be a valid number between 0 and 1,000,000');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};


export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};


export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
