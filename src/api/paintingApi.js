import axiosApi from './axiosApi';

export const paintingApi = {
  postPainting: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  },
  getAllPaintingByContestAccountId: async (endpoint, contestId, accountId) => {
    return await axiosApi.get(endpoint, {
      params: {
        contestId: contestId,
        accountId: accountId
      }
    });
  },
  updatePainting: async (endpoint, data, config) => {
    return await axiosApi.put(endpoint, data, config);
  }
};
