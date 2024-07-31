import axiosApi from './axiosApi';

export const getAllCompetitor = () => {
  return axiosApi.get('accounts/getallcompetitor');
};

export const blockCompetitor = id => {
  return axiosApi.patch(`accounts/inactiveaccount?id=${id}`);
};

export const activeCompetitor = id => {
  return axiosApi.patch(`accounts/activeaccount?id=${id}`);
};

export const getCompetitorByid = id => {
  return axiosApi.get(`accounts/getaccountbyid/${id}`);
};
