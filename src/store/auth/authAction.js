import { createAsyncThunk } from '@reduxjs/toolkit';
import { authenApi } from '../../api/authenApi';

export const competitorLogin = createAsyncThunk(
  '/Authentication/LoginCompetitor',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await authenApi.competitorLogin(
        '/Authentication/LoginCompetitor',
        { email, password },
        config
      );

      // store user's token in local storage
      localStorage.setItem('jwtToken', data.jwtToken);
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

// export const authRegister = createAsyncThunk(
//   "user/register",
//   async ({ firstName, email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
