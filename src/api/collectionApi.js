import axiosApi from './axiosApi';

export const getPaintingInCollectionId = id => {
  return axiosApi.get(`collections/Painting/${id}`);
};

export const getAllPaintingByAccountId = id => {
  return axiosApi.get(`paintings/listpaintingbyaccountid/${id}`);
};
