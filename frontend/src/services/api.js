
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL 
  : 'http://localhost:5000/api';


const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};


export const fetchProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
  
  return apiRequest(endpoint);
};

export const fetchProductById = async (id) => {
  return apiRequest(`/products/${id}`);
};

export const fetchCategories = async () => {
  const response = await apiRequest('/products/categories');
  return response.data || [];
};


export const submitEnquiry = async (enquiryData) => {
  return apiRequest('/enquiries', {
    method: 'POST',
    body: JSON.stringify(enquiryData),
  });
};

export const fetchEnquiries = async () => {
  const response = await apiRequest('/enquiries');
  return response.data || [];
};

export const fetchEnquiryById = async (id) => {
  return apiRequest(`/enquiries/${id}`);
};


export const checkServerHealth = async () => {
  try {
    const response = await apiRequest('/health');
    return response.status === 'OK';
  } catch {
    return false;
  }
};

