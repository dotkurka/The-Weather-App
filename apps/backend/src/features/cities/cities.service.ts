import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosError, RawAxiosRequestHeaders } from 'axios';
import { stringify } from 'qs';
import { catchError, lastValueFrom } from 'rxjs';

import envConfig from 'src/config/env.config';
import { CityDto } from 'src/features/cities/dto';
import { GeoDbCitiesResponse } from 'src/features/cities/types/geo-db-cities-response';

@Injectable()
export class CitiesService {
  private readonly logger = new Logger(CitiesService.name);
  private readonly axiosHeader: Partial<RawAxiosRequestHeaders>;

  constructor(
    @Inject(envConfig.KEY) private config: ConfigType<typeof envConfig>,
    private readonly httpService: HttpService,
  ) {
    this.axiosHeader = {
      'x-rapidapi-key': this.config.geoDb.key,
      'x-rapidapi-host': this.config.geoDb.host,
    };
  }

  private async fetchCities(namePrefix: string, limit = 10): Promise<GeoDbCitiesResponse> {
    const fetchUrl = `${this.config.geoDb.url}/cities?${stringify({ namePrefix, limit })}`;
    const { data } = await lastValueFrom(
      this.httpService.get<GeoDbCitiesResponse>(fetchUrl, { headers: this.axiosHeader }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  async getCities(namePrefix: string, limit = 10): Promise<CityDto[]> {
    const { data } = await this.fetchCities(namePrefix, limit);

    return data.map(({ country, name, countryCode, region, id }) => ({
      id,
      name,
      country,
      countryCode,
      region,
    }));
  }
}
