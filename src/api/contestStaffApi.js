import axiosApi from './axiosApi';

export const getById = id => {
  return axiosApi.get(`contests/${id}`);
};

export const createContest = payload => {
  return axiosApi.post('contests', payload);
};

export const getAll = () => {
  return axiosApi.get('contests/getallcontest');
};

export const editContest = payload => {
  return axiosApi.put('contests', payload);
};

export const deleteContest = id => {
  return axiosApi.patch(`contests?id=${id}`);
};
