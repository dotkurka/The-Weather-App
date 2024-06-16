import { Controller, Get, Query } from '@nestjs/common';

import { CitiesService } from 'src/features/cities/cities.service';
import { CityDto, CityQueryDto } from 'src/features/cities/dto';
import { cityQuerySchema } from 'src/features/cities/validations';
import { ZodValidationPipe } from 'src/features/common/pipes';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async getCities(
    @Query(new ZodValidationPipe(cityQuerySchema))
    { limit, namePrefix }: CityQueryDto,
  ): Promise<CityDto[]> {
    return this.citiesService.getCities(namePrefix, limit);
  }
}
