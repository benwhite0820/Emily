// 注意
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const signOutApi = createApi({
  reducerPath: 'signOutApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    fetchSignOut: builder.query({
      query: () => {
        return { url: 'logout', method: 'GET' };
      },
    }),
  }),
});

export const { useLazyFetchSignOutQuery } = signOutApi;
