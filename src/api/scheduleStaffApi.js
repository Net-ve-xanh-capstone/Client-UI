import axiosApi from './axiosApi';

export const createPreliminary = payload => {
  return axiosApi.post('schedules/preliminary', payload);
};

export const createFinal = payload => {
  return axiosApi.post('schedules/final', payload);
};

export const editShedule = payload => {
  return axiosApi.put('schedules', payload);
};

export const deleteSchedule = id => {
  return axiosApi.delete(`schedules?id=${id}`);
};

export const getScheduleByContestId = id => {
  return axiosApi.get(`schedules/contestId/${id}`);
};
