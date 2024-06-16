import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { GithubSearchController } from 'src/features/github-search/github-search.controller';
import { GithubSearchService } from 'src/features/github-search/github-search.service';

@Module({
  imports: [HttpModule],
  controllers: [GithubSearchController],
  providers: [GithubSearchService],
  exports: [],
})
export class GithubSearchModule {}
