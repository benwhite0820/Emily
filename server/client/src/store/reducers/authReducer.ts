import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

type State = Readonly<{
  isOpen: boolean;
  isLogin: boolean | null;
}>;

const initialState: State = {
  isOpen: false,
  isLogin: null,
};

export const fetchUserCookies = createAsyncThunk(
  'auth/fetchUserCookies',
  async () => {
    try {
      const response = await axios.get('/api/current_user');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUserLogout = createAsyncThunk(
  'auth/fetchUserLogout',
  async (_, { dispatch }) => {
    try {
      await axios.get('/api/logout');
      return dispatch(setIsLogin(false));
    } catch (error) {
      console.log(error);
    }
  }
);

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUser: (
      state,
      action: PayloadAction<{ name: string; account: string }>
    ) => {
      console.log(state);
      console.log(action.payload.account);
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCookies.fulfilled, (state, action) => {
        action.payload?.googleId
          ? (state.isLogin = true)
          : (state.isLogin = false);
      })
      .addCase(fetchUserLogout.fulfilled, () => {});
  },
});

export const { fetchUser, setIsLogin } = slice.actions;

export default slice.reducer;
