import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { Repository } from "typeorm";
import { StoryEntity } from "@app/story/entities/story.entity";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { CommentResponseInterface } from "./interfaces/create-response.interface";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>
  ) {}

  // Use dto interface to return selected fields
  async create(storyId: number, createCommentDto: CreateCommentDto): Promise<CommentResponseInterface> {
    const story = await this.storyRepository.findOne({ where: { id: storyId } });
    const comment = new CommentEntity();
    Object.assign(comment, createCommentDto);

    comment.story = story;
    comment.storyId = storyId;
    delete comment.story;

    return await this.commentRepository.save(comment);
  }
}
