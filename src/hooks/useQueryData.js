import { useQuery } from '@tanstack/react-query';
import { masterApi } from '../api/masterApi.js';

//Axios get data
const fetchDefaultData = async (url, id) => {
  let response = null;
  if (id) {
    response = await masterApi.getById(url, id);
  } else {
    response = await masterApi.fetchAll(url);
  }
  if (response.status === 200) {
    return response;
  } else {
    throw new Error('Network response was not ok');
  }
};

// Custom hook sử dụng tanstack query
const useFetchData = (endpoint, id) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => await fetchDefaultData(endpoint, id),
    retry: 3
  });
};

export default useFetchData;
