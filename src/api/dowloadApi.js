import axiosApi from './axiosApi';

export const dowloadExcel = id => {
  return axiosApi.get(`rounds/export-round-results?roundId=${id}`, {
    responseType: 'blob',
  });
};
