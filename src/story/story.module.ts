import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryEntity } from './entities/story.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { FollowEntity } from '@app/profile/entities/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoryEntity, UserEntity, FollowEntity])],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule {}
