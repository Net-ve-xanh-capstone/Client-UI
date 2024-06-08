import { createAsyncThunk } from "@reduxjs/toolkit";
import { auhtenApi } from "../../api/authenApi";

export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = auhtenApi.login(
        "/login",
        { username, password },
        config
      );

      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.error_message) {
        return rejectWithValue(error.response.data.error_message);
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
