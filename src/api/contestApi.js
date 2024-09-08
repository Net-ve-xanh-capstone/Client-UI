import axiosApi from './axiosApi';

export const contestApi = {
  getAll: async endPoint => await axiosApi.get(endPoint),
  getContestByStatus: async (endPoint, status) =>
    await axiosApi.get(endPoint, { params: { contestStatus: status } }),
};
