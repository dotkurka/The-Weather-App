import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { WeatherQueryParams, WeatherResponse } from 'src/types';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  tagTypes: ['Weather'],
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/weather`,
  }),
  endpoints: (build) => ({
    getWeatherByCity: build.query<WeatherResponse, WeatherQueryParams>({
      query: ({ ...query }) => ({
        url: '',
        params: query,
      }),
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;
