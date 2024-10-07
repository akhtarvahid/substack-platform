import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { DataSource, Repository } from "typeorm";
import { StoryEntity } from "@app/story/entities/story.entity";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { CommentResponseType } from "./interfaces/create-response.interface";
import { StoryCommentsResponse } from "./interfaces/story-comments-res-interface";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>,
    private dataSource: DataSource
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

  async findStoryComments(
    storyId: number,
    query: any
  ): Promise<StoryCommentsResponse> {
    const queryBuilder = this.dataSource
      .getRepository(CommentEntity)
      .createQueryBuilder("comments")
      .leftJoinAndSelect("comments.story", "story")
      .where("story.id = :storyId", { storyId });

    queryBuilder.orderBy("comments.createdAt", "DESC");
    const storyCommentsCount = await queryBuilder.getCount();

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const comments = await queryBuilder.getMany();
    const storyComments = comments?.map((comment) => ({
      storyId,
      id: comment?.id,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));

    return {
      storyComments,
      storyCommentsCount,
    };
  }
}
