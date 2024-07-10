import { useQuery } from '@tanstack/react-query';
import axiosApi from '../../../api/axiosApi';
import { masterApi } from '../../../api/masterApi';

//Axios get data
const fetchDefaultData = async (url) => {
  const response = await masterApi.fetchAll(url);
  if (response.status === 200) {
    return response;
  } else {
    throw new Error('Network response was not ok');
  }
};

// Custom hook sử dụng tanstack query
const useFetchData = (endpoint) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => await fetchDefaultData(endpoint),
    retry: 3
  });
};

export default useFetchData;
