import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8080', // Update with your Spring backend URL
  withCredentials: true, // Important for cookies to be sent
});

// Request interceptor - adds Authorization header to every request if token exists
api.interceptors.request.use(
  (config) => {
    // Get access token from localStorage (where we'll store it after login)
    const accessToken = localStorage.getItem('accessToken');
    
    // If token exists, add to headers
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles token refresh when 401 errors occur
api.interceptors.response.use(
  (response) => {
    // If login response, save the access token
    if (response.config.url === '/login' && response.headers['authorization']) {
      const accessToken = response.headers['authorization'].split(' ')[1];
      localStorage.setItem('accessToken', accessToken);
    }
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Call your refresh endpoint - the refresh token will be sent automatically
        // as a cookie due to withCredentials: true
        const response = await api.post('/reissue');
        
        // If reissue successful, update the access token in storage
        if (response.headers['authorization']) {
          const newAccessToken = response.headers['authorization'].split(' ')[1];
          localStorage.setItem('accessToken', newAccessToken);
          
          // Update the original request with the new token and retry
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        console.error('Token refresh failed', refreshError);
        localStorage.removeItem('accessToken');
        // You could redirect to login page here
        // window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication service functions
const authService = {
  // Login function
  login: async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      // The response interceptor will handle saving the token
      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },
  
  // Logout function
  logout: async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Logout failed', error);
      // Still remove the token even if API call fails
      localStorage.removeItem('accessToken');
      throw error;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  }
};

export { api, authService };