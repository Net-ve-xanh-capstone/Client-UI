import axiosApi from './axiosApi';

export const masterApi = {
  fetchAll: async (url) => {
    const response = await axiosApi.get(url);
    return response;
  },
  getById: async (url, id) => {
    const response = await axiosApi.get(`${url}/${id}`);
    return response;
  },
  create: async (url, data) => {
    const response = await axiosApi.post(url, data);
    return response;
  },
  update: async (url, data) => {
    const response = await axiosApi.put(url, data);
    return response;
  },
  delete: async (url, id) => {
    const response = await axiosApi.delete(`${url}/${id}`);
    return response;
  }
};
