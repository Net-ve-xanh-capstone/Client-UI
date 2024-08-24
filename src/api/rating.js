import axiosApi from './axiosApi';

export const ratingPainting = payload => {
  return axiosApi.put('schedules/Rating', payload);
};

export const confirmRating = id => {
  return axiosApi.put(`schedules/confirmrating/${id}`);
};
