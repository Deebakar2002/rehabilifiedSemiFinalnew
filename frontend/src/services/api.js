// src/services/api.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add a request interceptor to attach token if available
api.interceptors.request.use(
  (config) => {
    // Check for either adminToken or studentToken in localStorage
    const token = localStorage.getItem('adminToken') || localStorage.getItem('studentToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Check if data has a message property
      const errorMessage = error.response.data?.message || 'An error occurred';
      console.error(`Error: ${error.response.status} - ${errorMessage}`);
    } else if (error.request) {
      console.error('No response from server. Please check your network connection.');
    } else {
      console.error('Unexpected error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const handlePayment = async (eventId, selectedDays, totalAmount) => {
  const response = await api.post('/purchase', {
    eventId,
    selectedDays,
    totalAmount,
  });
  return response.data;
};

const API_URL = `${BASE_URL}/adminAccess`;

export const fetchStudentPurchasedCourses = async (studentId, token) => {
  try {
    const response = await axios.get(`${API_URL}/studentDetail/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Server error' };
  }
};

export default api;
