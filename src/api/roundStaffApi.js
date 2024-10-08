import axiosApi from './axiosApi';

export const createRoundLevel = payload => {
  return axiosApi.post('rounds', payload);
};

export const editRoundLevel = payload => {
  return axiosApi.put('rounds', payload);
};

export const deleteRoundLevel = id => {
  return axiosApi.patch(`rounds?id=${id}`);
};

export const roundTopicById = id => {
  return axiosApi.get(`roundtopics/roundtopic/roundid/${id}`);
};

export const getAllRoundStaff = () => {
  return axiosApi.get('rounds/roundsforstaff');
};

export const getCompetitorFinalByRound = roundId => {
  return axiosApi.get(`rounds/competitorfinalbyround/${roundId}`);
};

export const getRoundById = id => {
  return axiosApi.get(`rounds/${id}`);
};

export const adminEdit = payload => {
  // eslint-disable-next-line quotes
  return axiosApi.put(`rounds`, payload);
};

export const finalRound = roundId => {
  return axiosApi.get(`rounds/finalround/${roundId}`);
};

export const announceResults = roundId => {
  return axiosApi.get(`rounds/announce-results-round?roundId=${roundId}`);
};

