import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { ConfigModule } from '@nestjs/config';
// import { ElasticsearchConfigModule } from 'src/search/Search.module';
// import { ElasticsearchConfigService } from 'src/search/ElasticsearchConfig';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository]), AuthModule, 
  // ElasticsearchConfigModule
],
  controllers: [TasksController],
  providers: [TasksService, 
    // ElasticsearchConfigService
  ],
})
export class TasksModule {}
