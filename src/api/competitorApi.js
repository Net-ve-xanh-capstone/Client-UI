import axiosApi from './axiosApi';

export const getConmpetitors = id => {
  return axiosApi.get(`rounds/${id}/competitors`);
};

export const getRounds = id => {
  return axiosApi.get(`contests/${id}`);
};
