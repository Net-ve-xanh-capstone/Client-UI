export const isPhoneNumber = val => {
  const vietnamPhoneNumberPattern = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  return val === '' || vietnamPhoneNumberPattern.test(val);
};

export const isEmail = val => {
  return String(val)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
