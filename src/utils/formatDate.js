export const formatDate = dateString => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const cutString = (string, numberSlice) => {
  return string.slice(0, numberSlice);
};

export const parseDateEdit = string => {
  const initialDate = string;
  const dateObject = new Date(initialDate);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
