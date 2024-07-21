import axiosApi from './axiosApi';

export const getAllCompetitor = () => {
  return axiosApi.get('accounts/getallcompetitor');
};
