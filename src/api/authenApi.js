import axiosApi from "./axiosApi";
import tokenService from "./service/tokenService";

export const auhtenApi = {
  login: async (endpoint, data, config) => {
    return await axiosApi.post(endpoint, data, config);
  },
  refreshToken: async () => {
    const refreshToken = tokenService.getLocalRefreshToken();
    try {
      const response = await axios.post(`${BASE_URL}/refresh-token`,{ refreshToken });                      
      return response.data;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
  },
};
