import axiosApi from './axiosApi';

export const getScheduleExaminer = id => {
  return axiosApi.get(`schedules/examiner/${id}`);
};
