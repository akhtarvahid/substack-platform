import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { Repository } from "typeorm";
import { StoryEntity } from "@app/story/entities/story.entity";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { CommentResponseType } from "./interfaces/create-response.interface";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>
  ) {}

  async create(
    storyId: number,
    createCommentDto: CreateCommentDto
  ): Promise<CommentResponseType> {
    const comment = new CommentEntity();
    Object.assign(comment, createCommentDto);

    comment.storyId = storyId;

    return await this.commentRepository.save(comment);
  }
}
