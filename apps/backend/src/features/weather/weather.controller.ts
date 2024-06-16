import { Controller, Get, Query } from '@nestjs/common';

import { ZodValidationPipe } from 'src/features/common/pipes';
import { WeatherDto, WeatherQueryDto } from 'src/features/weather/dto';
import { weatherQuerySchema } from 'src/features/weather/validations';
import { WeatherService } from 'src/features/weather/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWetherByCity(
    @Query(new ZodValidationPipe(weatherQuerySchema)) { city }: WeatherQueryDto,
  ): Promise<WeatherDto | null> {
    return this.weatherService.getWeatherByCity(city);
  }
}
