import { Controller, Get, Query } from '@nestjs/common';

import { PaginationResponseDto } from 'src/features/common/dto';
import { ZodValidationPipe } from 'src/features/common/pipes';
import {
  GithubRepositoryDto,
  GithubSearchQueryDto,
} from 'src/features/github-search/dto';
import { GithubSearchService } from 'src/features/github-search/github-search.service';
import { githubSearchQuerySchema } from 'src/features/github-search/validations';

@Controller('github-search')
export class GithubSearchController {
  constructor(private readonly githubSearchService: GithubSearchService) {}

  @Get()
  async getWetherByCity(
    @Query(new ZodValidationPipe(githubSearchQuerySchema))
    { name, order }: GithubSearchQueryDto,
  ): Promise<PaginationResponseDto<GithubRepositoryDto>> {
    return this.githubSearchService.getRepositoriesByName(name, order);
  }
}
