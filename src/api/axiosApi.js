import axios from 'axios';
import { store } from '../store/configureStore.js';

const baseUrl = 'https://netvexanh.azurewebsites.net/api/';

const getToken = () => {
  const state = store.getState();
  return state.auth.jwtToken;
};

const axiosApi = axios.create({
  baseURL: baseUrl,
  Headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosApi.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosApi.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
export default axiosApi;
