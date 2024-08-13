import axiosApi from './axiosApi';

export const createPreliminary = payload => {
  return axiosApi.post('schedules/preliminary', payload);
};

export const createFinal = payloiad => {
  return axiosApi.post('schedules/final', payloiad);
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
