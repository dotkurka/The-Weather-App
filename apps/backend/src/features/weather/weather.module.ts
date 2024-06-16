import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WeatherController } from 'src/features/weather/weather.controller';
import { WeatherService } from 'src/features/weather/weather.service';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [],
})
export class WeatherModule {}
