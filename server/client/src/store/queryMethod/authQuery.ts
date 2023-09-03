import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const signOutApi = createApi({
  reducerPath: 'signOutApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    fetchSignout: builder.query<void, void>({
      query: () => 'logout',
    }),
  }),
});

export const { useLazyFetchSignoutQuery } = signOutApi;
