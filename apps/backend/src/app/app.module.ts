import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import envConfig from 'src/config/env.config';
import { CitiesModule } from 'src/features/cities/cities.module';
import { GithubSearchModule } from 'src/features/github-search/github-search.module';
import { WeatherModule } from 'src/features/weather/weather.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      cache: true,
      isGlobal: true,
    }),
    WeatherModule,
    CitiesModule,
    GithubSearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
