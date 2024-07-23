import axiosApi from './axiosApi';

export const paintingApi = {
  submitPainting: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  },
  getAllPaintingByCompetitorId: async (endpoint, config) => {
    return await axiosApi.get(endpoint, config);
  },
  updatePainting: async (endpoint, data, config) => {
    return await axiosApi.put(endpoint, data, config);
  },
  getAllPaintingByPage: async endpoint => {
    return await axiosApi.get(endpoint);
  },
  getPaintingById: async endpoint => {
    return await axiosApi.get(endpoint);
  },
  filterPainting: async endpoint => {
    return await axiosApi.get(endpoint);
  },
  addNewPainting: async (endpoint, payload) => {
    return await axiosApi.post(endpoint, payload);
  },
};
