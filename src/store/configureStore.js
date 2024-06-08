import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authSlice from "./auth/authSlice.js";

const reducer = combineReducers({
  // key: value
  auth: authSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
