import axiosApi from './axiosApi';

export const contestApi = {
  fetchAllContest: async () => {
    return await axiosApi.get('contests');
  },
};
