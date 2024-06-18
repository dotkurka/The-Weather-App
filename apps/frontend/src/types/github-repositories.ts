import { Order } from 'src/enums/order';

export interface GithubRepositoryEntryResponse {
  id: number;
  url: string;
  name: string;
  description: string;
  watchersCount: number;
}

export interface GithubRepositoriesResponse {
  data: GithubRepositoryEntryResponse[];
  count: number;
}

export interface GithubRepositoriesQueryParams {
  name: string;
  order?: Order;
}
