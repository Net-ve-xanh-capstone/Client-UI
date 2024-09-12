import axiosApi from './axiosApi';

export const authenApi = {
  competitorLogin: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  },
  competitorRegister: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  },
};

export const addNewStaff = payload => {
  return axiosApi.post('authentications/register', payload);
};

export const forgetPassword = payload => {
  return axiosApi.post('authentications/forgot-password', payload);
};
