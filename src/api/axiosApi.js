import axios from 'axios';
import { store } from '../store/configureStore.js';
import { handleLogout, parseJwt } from '../utils/parseToken.js';

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
// Add a request interceptor
axiosApi.interceptors.request.use(
  config => {
    const token = getToken(); // Lấy token từ localStorage/sessionStorage
    if (token) {
      const decodedToken = parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000); //(UNIX timestamp)

      if (decodedToken && decodedToken.exp < currentTime) {
        // Token đã hết hạn, thực hiện logout
        handleLogout();
        return Promise.reject('Phiên đăng nhập đã hết hạn');
      }

      // Nếu token còn hợp lệ, thêm vào headers
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
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
export default axiosApi;
