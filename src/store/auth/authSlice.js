import { createSlice } from "@reduxjs/toolkit";
import { competitorLogin } from "./authAction";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(competitorLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(competitorLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
      state.error = null;
    });
    builder.addCase(competitorLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // [authRegister.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [authRegister.fulfilled]: (state) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.error = null;
    // },
    // [authRegister.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
