import axiosApi from './axiosApi';

export const getQuantityPaintingByYear = () => {
  return axiosApi.get('contests/getquantitypaintingforyear');
};

export const getAwardContestByYear = () => {
  return axiosApi.get('contests/getawardquantityforyear');
};

export const getAllAccount = () => {
  return axiosApi.get('accounts/getallaccount');
};
