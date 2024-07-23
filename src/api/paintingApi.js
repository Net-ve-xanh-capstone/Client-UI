import axiosApi from './axiosApi';

export const paintingApi = {
  postPainting: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  },
  getAllPaintingByCompetitorId: async (endpoint, config) => {
    return await axiosApi.get(endpoint, config);
  },
  updatePainting: async (endpoint, data, config) => {
    return await axiosApi.put(endpoint, data, config);
  }
};
