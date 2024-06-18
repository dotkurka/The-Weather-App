export interface CitiesResponse {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  region: string;
}

export interface CitiesQueryParams {
  namePrefix: string;
  limit: number;
}
