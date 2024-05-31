import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    darkMode: false,
    showSidebar: true,
  },
  reducers: {
    toggleDarkMode: (state, action) => {
      return {
        ...state,
        darkMode: action.payload,
      };
    },
    toggleSidebar: (state, action) => {
      return {
        ...state,
        showSidebar: action.payload,
      };
    },
  },
});

export const { toggleDarkMode, toggleSidebar } = globalSlice.actions;
export default globalSlice.reducer;
