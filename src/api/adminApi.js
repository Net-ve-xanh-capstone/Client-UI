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

export const inactiveAccount = (id) => {
  return axiosApi.patch('accounts/inactiveaccount', {}, {
    params: {
      id,
    },
  });
};

export const activeAccount = (id) => {
  return axiosApi.patch('accounts/activeaccount', {}, {
    params: {
      id,
    },
  });
};
