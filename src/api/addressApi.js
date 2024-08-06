import axiosApi from './axiosApi.js';

const addressEndpoint = 'address';
export const addressApi = {
  getDistrict: async () => await axiosApi.get(addressEndpoint),
  getWard: async (districtId) => await axiosApi.get(`${addressEndpoint}/${districtId}`),
};