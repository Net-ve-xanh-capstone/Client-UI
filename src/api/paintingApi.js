import axiosApi from './axiosApi';

export const paintingApi = {
  submitPainting: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  }
};
