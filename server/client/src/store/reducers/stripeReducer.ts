import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = Readonly<{
  isPaymentOpent: boolean;
}>;

export const slice = createSlice({
  name: 'stripe',
  initialState: {} as State,
  reducers: {
    setIsPaymentOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isPaymentOpent = payload;
    },
  },
});

export const { setIsPaymentOpen } = slice.actions;

export default slice.reducer;
