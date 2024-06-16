import { Controller, Get } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  @Get()
  getWetherByCity() {
    return 'hello';
  }
}
