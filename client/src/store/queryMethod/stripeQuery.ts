import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stripePaymentApi = createApi({
  reducerPath: 'stripePayment',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    fetchPayment: builder.query<{ clientSecret: string }, void>({
      query: () => 'stripe_setup',
    }),
  }),
});

export const { useFetchPaymentQuery } = stripePaymentApi;
