import axiosApi from './axiosApi';

export const paintingApi = {
  postPainting: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  },
  getAllPaintingByContestAccountId: async (endpoint, contestId, accountId) => {
    return await axiosApi.get(endpoint, {
      params: {
        contestId: contestId,
        accountId: accountId,
      },
    });
  },
  updatePainting: async (endpoint, payload) => {
    return await axiosApi.put(endpoint, payload);
  },
  getAllPaintingByPage: async endpoint => {
    return await axiosApi.get(endpoint);
  },
  getPaintingById: async endpoint => {
    return await axiosApi.get(endpoint);
  },
  filterPainting: async (endpoint, payload) => {
    return await axiosApi.post(endpoint, payload);
  },
  addNewPainting: async (endpoint, payload) => {
    return await axiosApi.post(endpoint, payload);
  },
  addNewFinalRound: async (endpoint, payload) => {
    return await axiosApi.post(endpoint, payload);
  },
};
