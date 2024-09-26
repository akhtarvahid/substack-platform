// import { Module, OnModuleInit } from '@nestjs/common';
// import { ElasticsearchModule } from '@nestjs/elasticsearch';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ElasticsearchConfigService } from './ElasticsearchConfig';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     ElasticsearchModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         node: configService.get('ELASTICSEARCH_NODE'),
//         auth: {
//           username: configService.get('ELASTICSEARCH_USERNAME'),
//           password: configService.get('ELASTICSEARCH_PASSWORD'),
//         },
//       }),
//     }),
//   ],
//   exports: [ElasticsearchModule],
//   providers: [ElasticsearchConfigService]
// })
// export class ElasticsearchConfigModule {}
