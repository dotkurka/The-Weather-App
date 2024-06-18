export interface WeatherResponse {
  status: string;
  description: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  feelsLike: number;
  humidity: number;
  city: string;
  windSpeed: number;
  country: string;
}

export interface WeatherQueryParams {
  city: string;
}
