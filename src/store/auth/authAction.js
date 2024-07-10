import { createAsyncThunk } from '@reduxjs/toolkit';
import { authenApi } from '../../api/authenApi';
import Role from '../../constant/Role';

export const competitorLogin = createAsyncThunk(
  'login',
  async ({ username, password }, { rejectWithValue, getState }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await authenApi.competitorLogin(
        'authentications/login',
        { username, password },
        config
      );

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
  'create',
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const fullName = payload.lastname + ' ' + payload.firstname;
      const role = Role.COMPETITOR;
      const date = new Date(payload.birthday);
      const birthday = date.toISOString();
      const req = {
        ...payload,
        fullName,
        role,
        birthday
      };

      const { data } = await authenApi.competitorRegister('/create', req, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
