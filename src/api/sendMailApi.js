import axiosApi from './axiosApi';

export const sendMail = id => {
  return axiosApi.get('schedules/preliminary', id);
};
    