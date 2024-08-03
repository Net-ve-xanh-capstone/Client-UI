import axiosApi from './axiosApi.js';

const endpoint = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
export const addressApi = {
  get: async () => await axiosApi.get(endpoint)
};