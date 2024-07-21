export const isPhoneNumber = (val) => {
  const vietnamPhoneNumberPattern = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  return val === '' || vietnamPhoneNumberPattern.test(val);
};
