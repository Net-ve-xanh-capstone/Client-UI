import { createSlice } from "@reduxjs/toolkit";
import { competitorLogin } from "./authAction";

// initialize userToken from local storage
const jwtToken = localStorage.getItem("jwtToken")
  ? localStorage.getItem("jwtToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  jwtToken,
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
      state.jwtToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(competitorLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(competitorLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.jwtToken = payload.jwtToken;
      state.error = null;
      state.success = true;
    });
    builder.addCase(competitorLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
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
