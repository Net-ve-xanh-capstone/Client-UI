import axiosApi from './axiosApi';

export const getAllBlog = (PageNumber) => {
  return axiosApi.get(`posts?PageSize=6&PageNumber=${PageNumber}`);
};

export const deleteBlog = (id) => {
  return axiosApi.patch(`posts?id=${id}`);
};

export const getBlogId = (id) => {
  return axiosApi.get(`posts/${id}`);
};

export const updateBlog = (payload) => {
  return axiosApi.put('posts', payload);
};

export const addnewBlog = (payload) => {
  return axiosApi.post('posts', payload);
};

export const searchingBlog = (payload) => {
  return axiosApi.get(
    `posts/search?searchString=${payload.serchString}&PageSize=10&PageNumber=${payload.pageNumber}`,
  );
};
