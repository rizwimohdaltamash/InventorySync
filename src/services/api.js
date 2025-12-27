import axios from 'axios';

const API_URL = 'https://inventorysync-backend-3.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getOne: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getLowStock: () => api.get('/products/low-stock')
};

// Stock Movements API
export const stockAPI = {
  getAll: (params) => api.get('/stock-movements', { params }),
  create: (data) => api.post('/stock-movements', data),
  getProductHistory: (inventoryId) => api.get(`/stock-movements/product/${inventoryId}`),
  // Specific movement type endpoints
  stockIn: (data) => api.post('/stock/in', data),
  stockOut: (data) => api.post('/stock/out', data),
  stockDamage: (data) => api.post('/stock/damage', data)
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getTrends: (days) => api.get('/dashboard/trends', { params: { days } }),
  getTopSKUs: () => api.get('/dashboard/top-skus')
};

export default api;
