import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  GithubRepositoriesQueryParams,
  GithubRepositoriesResponse,
} from 'src/types/github-repositories';

export const githubRepositoriesApi = createApi({
  reducerPath: 'githubRepositoriesApi',
  tagTypes: ['Github'],
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/github-repositories`,
  }),
  endpoints: (build) => ({
    getGitHubRepositoryByName: build.query<
      GithubRepositoriesResponse,
      GithubRepositoriesQueryParams
    >({
      query: ({ ...query }) => ({
        url: '',
        params: query,
      }),
    }),
  }),
});

export const { useGetGitHubRepositoryByNameQuery } = githubRepositoriesApi;
