import axiosApi from './axiosApi';

export const topicApi = {
  getAllTopic: async (endpoint, config) => {
    return await axiosApi.get(endpoint, config);
  }
};
