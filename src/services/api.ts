import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Add request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await api.get('/api/auth/refresh');
        const { access_token } = response.data;
        localStorage.setItem('authToken', access_token);
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('authToken');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;