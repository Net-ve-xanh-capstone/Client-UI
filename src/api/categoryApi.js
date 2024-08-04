import axiosApi from './axiosApi';

export const categoryNotuse = () => {
  return axiosApi.get(`categories/getallcategoryunused`);
};
// wait for api by backend
export const allCategory = () => {
  return axiosApi.get(`categories/getallcategory`);
};

export const updateCate = payload => {
  return axiosApi.put(`categories`, payload);
};

export const deleteCate = id => {
  return axiosApi.patch(`categories?id=${id}`);
};

export const addnewCategory = payload => {
  return axiosApi.post(`categories`, payload);
};

export const getContaintCategory = () => {
  return axiosApi.get(`categories/getallcategory?PageSize=20&PageNumber=1`);
};
