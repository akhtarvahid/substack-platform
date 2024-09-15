import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchConfigService {
  constructor(private configService: ConfigService) {}

  public createElasticsearchOptions() {
    return {
      node: this.configService.get('ELASTICSEARCH_NODE'),
      auth: {
        username: this.configService.get('ELASTICSEARCH_USERNAME'),
        password: this.configService.get('ELASTICSEARCH_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false, // If you use self-signed certificates
      },
    };
  }
}
