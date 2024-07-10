export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const cutString = (string, numberSlice) => {
  return string.slice(0, numberSlice);
};
