import axiosApi from './axiosApi';

export const getAwardId = id => {
  return axiosApi.get(`awards/Round/${id}`);
};
