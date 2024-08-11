import axiosApi from './axiosApi';

export const getById = id => {
  return axiosApi.get(`awardschedules/${id}`);
};

export const getScheduleById = id => {
  return axiosApi.get(`awardschedules/schedule/${id}`);
};

export const getContestsByExaminer = id => {
  return axiosApi.get(`schedules/examiner/${id}`);
};
