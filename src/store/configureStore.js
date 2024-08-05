import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authSlice from './auth/authSlice.js';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistedConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth'],
  stateReconciler: autoMergeLevel2,
};

const authPersistedConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['jwtToken', 'userInfo'],
  blacklist: ['login', 'register'],
};

const reducer = combineReducers({
  // key: value
  auth: persistReducer(authPersistedConfig, authSlice),
});

const persistedReducer = persistReducer(persistedConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persistor = persistStore(store);
