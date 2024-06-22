import { createSlice } from '@reduxjs/toolkit';
import { competitorLogin, competitorRegister } from './authAction';
import { jwtDecode } from 'jwt-decode';

// initialize userToken from local storage
const jwtToken = localStorage.getItem('jwtToken') ? localStorage.getItem('jwtToken') : null;

const decodeToken = jwtToken ? jwtDecode(jwtToken) : null;
const initialState = {
  login: {
    loading: false,
    userInfo: null,
    jwtToken,
    success: false,
    message: null
  },
  register: {
    loading: false,
    success: false,
    message: null
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');
      state.loading = false;
      state.userInfo = null;
      state.jwtToken = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(competitorLogin.pending, (state) => {
      state.login.loading = true;
    });
    builder.addCase(competitorLogin.fulfilled, (state, { payload }) => {
      state.login.loading = false;
      state.login.userInfo = decodeToken;
      state.login.jwtToken = payload.jwtToken;
      state.login.success = payload.success;
      state.login.message = payload.message;
    });
    builder.addCase(competitorLogin.rejected, (state, { payload }) => {
      state.login.loading = false;
      state.login.success = false;
      state.login.message = payload;
    });
    builder.addCase(competitorRegister.pending, (state) => {
      state.register.loading = true;
    });
    builder.addCase(competitorRegister.fulfilled, (state, { payload }) => {
      state.register.loading = false;
      state.register.success = payload.success;
      state.register.message = payload.message;
    });
    builder.addCase(competitorRegister.rejected, (state, { payload }) => {
      state.register.loading = false;
      state.register.success = payload.success;
      state.register.message = payload.message;
    });
  }
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
