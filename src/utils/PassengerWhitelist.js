import { createTransform } from 'redux-persist';

export const passengerWhiteList = createTransform(
  null,
  (state, key) => {
    {
      /* Put the code for the initial data here.
        It means when the app will be reopened next 
        data will be cleared/filled up.
    */
    }
    {
      /* If you want to not clear but remove the keys, 
        you can use for example omit from 'lodash/omit' here, 
        or any tools what you want
    */
    }
    const newState = { ...state };
    newState.order.from = '';
    newState.order.to = '';
    return newState;
  },
  { whitelist: ['auth'] }
);
