import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CitiesQueryParams, CitiesResponse } from 'src/types';

export const citiesApi = createApi({
  reducerPath: 'citiesApi',
  tagTypes: ['Cities'],
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/cities`,
  }),
  endpoints: (build) => ({
    getCitiesByName: build.query<CitiesResponse[], Partial<CitiesQueryParams>>({
      query: ({ ...query }) => ({
        url: '',
        params: query,
      }),
    }),
  }),
});

export const { useGetCitiesByNameQuery, useLazyGetCitiesByNameQuery } = citiesApi;
