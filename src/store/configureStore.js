import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice.js";
import logger from "redux-logger";

const reducer = combineReducers({
  // key: value
  global: globalSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
