import { configureStore } from '@reduxjs/toolkit';

import { citiesApi, weatherApi, githubRepositoriesApi } from 'src/api';

export const store = configureStore({
  reducer: {
    [citiesApi.reducerPath]: citiesApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [githubRepositoriesApi.reducerPath]: githubRepositoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      citiesApi.middleware,
      weatherApi.middleware,
      githubRepositoriesApi.middleware,
    ),
});
