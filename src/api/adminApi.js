import axiosApi from './axiosApi';

export const getQuantityPaintingByYear = () => {
  return axiosApi.get('contests/getquantitypaintingforyear');
};
