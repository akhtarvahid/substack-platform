import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { DataSource, Repository } from "typeorm";
import { StoryEntity } from "@app/story/entities/story.entity";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { CommentResponseType } from "./interfaces/create-response.interface";
import {
  FindAllStoryCommentResponse,
} from "./interfaces/story-comments-res-interface";
import { UpdateCommentDto } from "./dtos/update-comment.dto";

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
    userId: number,
    createCommentDto: CreateCommentDto
  ): Promise<CommentEntity> {
    const comment = new CommentEntity();
    Object.assign(comment, createCommentDto);

    comment.storyId = storyId;
    comment.authorId = userId;

    return await this.commentRepository.save(comment);
  }

  async update(
    storyId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto
  ): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, storyId: storyId },
    });

    Object.assign(comment, updateCommentDto);

    return await this.commentRepository.save(comment);
  }

  async findStoryComments(
    storyId: number,
    query: any
  ): Promise<FindAllStoryCommentResponse> {
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
    const resultCount = Math.ceil(storyCommentsCount / query.limit);
    const storyComments = comments?.map((comment) => ({
      id: comment?.id,
      storyId: comment.storyId,
      authorId: comment?.authorId,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }));

    return {
      storyComments,
      storyCommentsCount,
      resultCount,
    };
  }

  async findOneStoryComment(
    storyId: number,
    commentId: number
  ): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, storyId: storyId },
    });

    return comment;
  }

  async delete(storyId: number, commentId: number): Promise<String> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, storyId: storyId },
    });

    // check if comment exist
    if (comment) {
      await this.commentRepository.delete(commentId);
    }
    return `comment with id ${commentId} deleted`;
  }

  async buildCommentResponse(
    comment: CommentEntity
  ): Promise<CommentResponseType> {
    return {
      storyComment: comment,
    };
  }
}
