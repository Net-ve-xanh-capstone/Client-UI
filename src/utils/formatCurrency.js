export const formatCurrencyVND = value => {
  return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
};
