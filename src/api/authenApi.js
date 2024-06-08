import axiosApi from "./axiosApi";

export const auhtenApi = {
  login: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  },
};
