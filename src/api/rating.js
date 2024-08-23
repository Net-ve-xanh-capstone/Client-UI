import axiosApi from './axiosApi';

export const ratingPainting = payload => {
  return axiosApi.put('schedules/Rating', payload);
};
