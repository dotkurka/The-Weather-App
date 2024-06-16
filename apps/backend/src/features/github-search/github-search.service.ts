import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';
import { stringify } from 'qs';
import { catchError, lastValueFrom } from 'rxjs';

import envConfig from 'src/config/env.config';
import { PaginationResponseDto } from 'src/features/common/dto';
import { Order } from 'src/features/common/enum';
import { GithubRepositoryDto } from 'src/features/github-search/dto';
import {
  GithubRepositoriesSearchResponse,
  GithubRepositoryEntry,
} from 'src/features/github-search/types';

@Injectable()
export class GithubSearchService {
  private readonly logger = new Logger(GithubSearchService.name);

  constructor(
    @Inject(envConfig.KEY) private config: ConfigType<typeof envConfig>,
    private readonly httpService: HttpService,
  ) {}

  private async fetchRepositoriesByName(
    repoName: string,
    order?: Order,
  ): Promise<GithubRepositoriesSearchResponse> {
    const fetchUrl = `${this.config.githubApiUrl}/search/repositories?${stringify({ q: repoName, order })}`;

    const { data } = await lastValueFrom(
      this.httpService.get<GithubRepositoriesSearchResponse>(fetchUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  private convertGithubRepositoryEntry(
    entry: GithubRepositoryEntry[],
  ): GithubRepositoryDto[] {
    return entry.map(
      ({ description, full_name, html_url, id, watchers_count }) => ({
        id,
        description,
        name: full_name,
        url: html_url,
        watchersCount: watchers_count,
      }),
    );
  }

  async getRepositoriesByName(
    repoName: string,
    order?: Order,
  ): Promise<PaginationResponseDto<GithubRepositoryDto>> {
    const { total_count, items } = await this.fetchRepositoriesByName(
      repoName,
      order,
    );

    const convertedRepositoryData = this.convertGithubRepositoryEntry(items);

    return {
      data: convertedRepositoryData,
      count: total_count,
    };
  }
}
