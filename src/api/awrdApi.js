import axiosApi from './axiosApi';

export const getAwardId = id => {
  return axiosApi.get(`awards/Round/${id}`);
};

export const getAwardForScheduleByRoundId = id => {
  return axiosApi.get(`awards/getawardforschedule/${id}`);
};

export const putAwards = payload => {
  return axiosApi.put('awards', payload);
};

export const createAward = payload => {
  return axiosApi.post('awards', payload);
};

export const deleteAward = id => {
  return axiosApi.patch(`awards?id=${id}`);
};
