import axiosApi from './axiosApi';

export const topicApi = {
  getAllTopic: async (endpoint, accountId, contestId, config) => {
    return await axiosApi.get(endpoint, {
      params: {
        AccountId: accountId,
        ContestId: contestId,
      },
      ...config,
    });
  }
};
