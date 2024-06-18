import axiosApi from './axiosApi';

export const authenApi = {
  competitorLogin: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  }
};
