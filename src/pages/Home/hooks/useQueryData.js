import { useQuery } from '@tanstack/react-query';
import axiosApi from '../../../api/axiosApi';

//Axios get data
const fetchDefaultData = async (url) => {
  const response = await axiosApi.get(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
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
