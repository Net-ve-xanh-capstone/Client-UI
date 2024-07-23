import { createSlice } from '@reduxjs/toolkit';
import { competitorLogin, competitorRegister } from './authAction';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  jwtToken: null,
  userInfo: null,
  login: {
    loading: false,
    success: false,
    message: null,
    error: false,
  },
  register: {
    loading: null,
    success: null,
    message: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('userToken');
      state.userInfo = null;
      state.jwtToken = null;
      state.login.success = false;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    setDefault: state => {
      state.login = {
        loading: false,
        success: false,
        message: null,
        error: false,
      };
      state.register = {
        loading: null,
        success: null,
        message: null,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(competitorLogin.pending, state => {
      state.login.loading = true;
    });
    builder.addCase(competitorLogin.fulfilled, (state, { payload }) => {
      state.login.loading = false;
      state.jwtToken = payload.jwtToken;
      state.userInfo = payload.jwtToken ? jwtDecode(payload.jwtToken) : null;
      state.login.success = payload.success;
      state.login.message = payload.message;
      state.login.error = !payload.success;
    });
    builder.addCase(competitorLogin.rejected, (state, { payload }) => {
      state.login.loading = false;
      state.login.success = payload.success;
      state.login.message = payload;
      state.login.error = !payload.success;
    });
    builder.addCase(competitorRegister.pending, state => {
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
  },
});

export const { logout, setCredentials, setDefault } = authSlice.actions;
export default authSlice.reducer;
