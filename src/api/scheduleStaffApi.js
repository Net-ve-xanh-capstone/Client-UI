import axiosApi from './axiosApi';

export const createAutoPreliminary = payload => {
  return axiosApi.post('schedules/qualifying-round/auto-assign', payload);
};

export const createManualPreliminary = payload => {
  return axiosApi.post('schedules/final-round/manual-assign', payload);
};

export const createAutoFinal = payload => {
  return axiosApi.post('schedules/final-round/auto-assign', payload);
};

export const createManualFinal = payload => {
  return axiosApi.post('schedules/final-round/manual-assign', payload);
};

export const editSchedule = payload => {
  return axiosApi.put('schedules', payload);
};

export const deleteSchedule = id => {
  return axiosApi.delete(`schedules?id=${id}`);
};

export const getScheduleByContestId = id => {
  return axiosApi.get(`schedules/contestId/${id}`);
};
