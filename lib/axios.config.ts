import axios from 'axios';
import { API_URL } from './apiEndPoints';

// Create an instance of axios with custom configuration
const myAxios = axios.create({
  baseURL: API_URL, // Set the base URL for API requests
  headers: {
    Accept: 'application/json' // Set default headers to accept JSON responses
  }
});

export default myAxios; // Export the customized axios instance as default
