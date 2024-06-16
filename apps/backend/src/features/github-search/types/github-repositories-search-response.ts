export interface GithubOwnerEntry {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
}

export interface GithubRepositoryEntry {
  id: number;
  name: string;
  full_name: string;
  owner: GithubOwnerEntry;
  html_url: string;
  description: string;
  watchers_count: number;
  watchers: number;
}

export interface GithubRepositoriesSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepositoryEntry[];
}
