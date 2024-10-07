import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { CommentResponseType } from "./interfaces/create-response.interface";
import { StoryCommentsResponse } from "./interfaces/story-comments-res-interface";

@Controller("stories/:id")
export class CommentController {
  @Inject() commentService: CommentService;

  @Get("/health")
  health() {
    return "COMMENTS UP";
  }

  @Post("/comments")
  async createComment(
    @Param("id") storyId: number,
    @Body("comment") createCommentDto: CreateCommentDto
  ): Promise<CommentResponseType> {
    return await this.commentService.create(storyId, createCommentDto);
  }

  @Get("/comments")
  async comments(
    @Param("id") storyId: number,
    @Query() query: any
  ): Promise<StoryCommentsResponse> {
    return await this.commentService.findStoryComments(storyId, query);
  }
}
