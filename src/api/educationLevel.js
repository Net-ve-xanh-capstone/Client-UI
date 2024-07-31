import axiosApi from './axiosApi.js';

export const getAllLevel = () => {
  return axiosApi.get('educationallevels/getalllevel');
};
