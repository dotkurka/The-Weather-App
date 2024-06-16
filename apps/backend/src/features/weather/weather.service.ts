import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';
import { stringify } from 'qs';
import { catchError, lastValueFrom } from 'rxjs';

import envConfig from 'src/config/env.config';
import { WeatherDto } from 'src/features/weather/dto';
import { OpenWeatherResponse } from 'src/features/weather/types';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private baseFetchQueryParams = {};

  constructor(
    @Inject(envConfig.KEY) private config: ConfigType<typeof envConfig>,
    private readonly httpService: HttpService,
  ) {
    this.baseFetchQueryParams = {
      units: 'metric',
      appid: this.config.openWether.key,
    };
  }

  private async fetchWetherByCity(city: string): Promise<OpenWeatherResponse> {
    const fetchUrl = `${this.config.openWether.url}/weather?${stringify({ q: city, ...this.baseFetchQueryParams })}`;
    const { data } = await lastValueFrom(
      this.httpService.get<OpenWeatherResponse>(fetchUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  async getWeatherByCity(city: string): Promise<WeatherDto | null> {
    const { weather, wind, name, main, sys } =
      await this.fetchWetherByCity(city);

    if (weather.length < 0) {
      return null;
    }

    const { description, main: status } = weather[0];
    const { feels_like, humidity, temp, temp_max, temp_min } = main;

    return {
      city: name,
      country: sys.country,
      feelsLike: feels_like,
      maxTemp: temp_max,
      minTemp: temp_min,
      windSpeed: wind.speed,
      temp,
      status,
      description,
      humidity,
    };
  }
}
