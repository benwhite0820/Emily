import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { signOutApi } from './queryMethod/authQuery';

const store = configureStore({
  reducer: {
    authReducer,
    [signOutApi.reducerPath]: signOutApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }).concat(signOutApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
