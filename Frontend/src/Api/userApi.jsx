// src/api/userApi.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Change to your backend's correct URL

// Sends email to backend to trigger code generation
export const requestResetCode = async (email) => {
  return await axios.post(`${BASE_URL}/forgotpassword`, { email });
};

// Sends code + new password to backend for resetting
export const resetPassword = async (data) => {
  return await axios.post(`${BASE_URL}/resetpassword`, data);
};

