export const formatDate = dateString => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
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
