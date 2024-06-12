import axios from "axios";
import { auhtenApi } from "./authenApi";
import tokenService from "./service/tokenService";

const baseUrl = "http://localhost:3001";

let isRefreshing = false;
let failedQueue = [];

const axiosApi = axios.create({
  baseURL: baseUrl,
  Headers: { "Content-Type": "application/json" },
});

// Add the auth token to every request
axiosApi.interceptors.request.use(
  config => {
      const token = tokenService.getLocalAccessToken();
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  error => Promise.reject(error)
);

function subscribeTokenRefresh(cb) {
  failedQueue.push(cb);
}

function onRefreshed(token) {
  failedQueue.forEach(cb => cb(token));
  failedQueue = [];
}

// Add a response interceptor
axiosApi.interceptors.response.use(
  response => response,
  err => {
      const { config, response } = err;
      const originalRequest = config;
      if (response && response.status === 401 && !originalRequest._retry) {
          if (!isRefreshing) {
              isRefreshing = true;
              return auhtenApi.refreshToken()
                  .then(({ access_token, refresh_token }) => {
                   tokenService.updateLocalAccessToken(access_token);
                    tokenService.updateLocalRefreshToken(refresh_token);
                     request.defaults.headers.common['Authorization'] = `Bearer${access_token}`;        
                      isRefreshing = false;
                      onRefreshed(access_token);
return Promise.all(failedQueue.map(cb =>   cb(access_token))).then(() => {
                          return axios(originalRequest);
                      });
                  })
                  .catch(error => {
                      isRefreshing = false;
                      tokenService.clearTokens();
                      navigationRef.navigate('Login');
                      return Promise.reject(error);
                  })
                  .finally(() => failedQueue = []);
          }

          originalRequest._retry = true;
          return new Promise((resolve, reject) => {
              subscribeTokenRefresh(token => {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`;
                  resolve(axios(originalRequest));
              });
          });
      }

      return Promise.reject(err);
  }
);

export default axiosApi;
