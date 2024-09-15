import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchConfigService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexDocument(index: string, id: string, body: any) {
    return this.elasticsearchService.index({
      index,
      id,
      body,
    });
  }

  async search(index: string, query: any) {
    return this.elasticsearchService.search({
      index,
      body: query,
    });
  }
}
