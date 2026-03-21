import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      // Only redirect if on admin page
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Product APIs
export const getProducts = (params) => api.get('/products', { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const getProductStats = () => api.get('/products/stats');
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Slide APIs
export const getSlides = () => api.get('/slides');
export const getAdminSlides = () => api.get('/slides/admin');
export const createSlide = (data) => api.post('/slides', data);
export const updateSlide = (id, data) => api.put(`/slides/${id}`, data);
export const deleteSlide = (id) => api.delete(`/slides/${id}`);

// Auth APIs
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const verifyToken = () => api.get('/auth/verify');

// Upload API
export const uploadImages = (formData) =>
  api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Image URL helper
export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path; // Already absolute URL
  
  // Remove /api from API_BASE if it exists, since uploads are usually served at the root
  const baseUrl = API_BASE.endsWith('/api') ? API_BASE.slice(0, -4) : API_BASE;
  return `${baseUrl}${path}`;
};

export default api;
