import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CitiesController } from 'src/features/cities/cities.controller';
import { CitiesService } from 'src/features/cities/cities.service';

@Module({
  imports: [HttpModule],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [],
})
export class CitiesModule {}
