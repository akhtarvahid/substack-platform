import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { StoryEntity } from "@app/story/entities/story.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, StoryEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
