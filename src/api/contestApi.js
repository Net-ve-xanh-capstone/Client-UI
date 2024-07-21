import axiosApi from './axiosApi';

export const contestApi = {
  getAll: async (endPoint) => await axiosApi.get(endPoint)
};
