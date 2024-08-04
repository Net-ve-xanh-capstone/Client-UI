import axiosApi from './axiosApi';

export const getAllSponsor = () => {
  return axiosApi.get('sponsors/getallsponsor');
};

export const deleteSponsor = id => {
  return axiosApi.patch(`sponsors?id=${id}`);
};

export const addSponsor = payload => {
  return axiosApi.post(`sponsors`, payload);
};

export const getSponsorId = id => {
  return axiosApi.get(`sponsors/${id}`);
};

export const putSponsor = payload => {
  return axiosApi.put(`sponsors`, payload);
};
