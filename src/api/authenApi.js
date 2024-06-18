import axiosApi from "./axiosApi";

export const auhtenApi = {
  competitorLogin: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  },
};
