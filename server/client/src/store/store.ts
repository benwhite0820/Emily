import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { signOutApi } from './queryMethod/authQuery';
import { stripePaymentApi } from './queryMethod/stripeQuery';

const store = configureStore({
  reducer: {
    authReducer,
    [signOutApi.reducerPath]: signOutApi.reducer,
    [stripePaymentApi.reducerPath]: stripePaymentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }).concat(signOutApi.middleware, stripePaymentApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
