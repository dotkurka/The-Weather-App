import { Controller, Get } from '@nestjs/common';

import { HealthCheckDto } from 'src/app/dto';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealthCheck(): HealthCheckDto {
    return this.appService.getHealthCheck();
  }
}
