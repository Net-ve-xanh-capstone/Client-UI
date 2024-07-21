import axiosApi from './axiosApi';

export const topicApi = {
  getAllTopic: async (endpoint) => {
    return await axiosApi.get(endpoint);
  }
};
