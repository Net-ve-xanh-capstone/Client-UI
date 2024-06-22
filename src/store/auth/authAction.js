import { createAsyncThunk } from '@reduxjs/toolkit';
import { authenApi } from '../../api/authenApi';

export const competitorLogin = createAsyncThunk(
  '/login',
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await authenApi.competitorLogin('/login', { userName, password }, config);

      // store user's token in local storage
      if (data.jwtToken) {
        localStorage.setItem('jwtToken', data.jwtToken);
      }
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.message) {
        return rejectWithValue(error.response.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const competitorRegister = createAsyncThunk(
  '/create',
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await authenApi.competitorRegister('/create', payload, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
