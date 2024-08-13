import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listAdding: [],
};

const markSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    store: (state, action) => {
      state.listAdding = action.payload;
    },
    unStore: (state, action) => {
      state.listAdding.filter(val => val.id !== action.payload.id);
    },
    clear: state => {
      state.listAdding = [];
    },
  },
});

export const { store } = markSlice.actions;
export default markSlice.reducer;
