import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://triple-pottery-421714.lm.r.appspot.com/api', // Replace with your backend URL
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};
