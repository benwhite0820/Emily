import { UserDataType } from '@/types/userData.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stripePaymentApi = createApi({
  reducerPath: 'stripePayment',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Stripe_Payment'],
  endpoints: (builder) => ({
    fetchPayment: builder.query<{ clientSecret: string }, void>({
      query: () => 'stripe_setup',
    }),
    fetchCurrentUserCredits: builder.query<UserDataType, void>({
      query: () => {
        return 'current_user';
      },
      providesTags: (result) => [
        { type: 'Stripe_Payment', id: result?.googleId },
      ],
    }),
    fetchUpdateCredits: builder.mutation<
      UserDataType,
      { paymentStatus: string }
    >({
      query: ({ paymentStatus }) => {
        return {
          url: `stripe_successful`,
          method: 'POST',
          body: { paymentStatus },
        };
      },
      invalidatesTags: (result) => [
        { type: 'Stripe_Payment', id: result?.googleId },
      ],
    }),
  }),
});

export const {
  useFetchPaymentQuery,
  useFetchUpdateCreditsMutation,
  useFetchCurrentUserCreditsQuery,
} = stripePaymentApi;
