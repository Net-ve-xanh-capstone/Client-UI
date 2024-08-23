import axiosApi from './axiosApi.js';

export const getAllLevel = () => {
  return axiosApi.get('educationallevels/getalllevel');
};

export const putLevel = payload => {
  return axiosApi.put('educationallevels', payload);
};
