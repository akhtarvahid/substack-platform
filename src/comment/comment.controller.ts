import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { CommentResponseType } from "./interfaces/create-response.interface";
import {
  CommentsResponse,
  StoryCommentsResponse,
} from "./interfaces/story-comments-res-interface";
import { UpdateCommentDto } from "./dtos/update-comment.dto";
import { UpdateResponseType } from "./interfaces/update-response.interface";
import { AuthGuard } from "@app/user/guards/auth.guard";

@Controller("stories/:id")
export class CommentController {
  @Inject() commentService: CommentService;

  @Get("/health")
  health() {
    return "COMMENTS UP";
  }

  @Get("/comments")
  @UseGuards(AuthGuard)
  async comments(
    @Param("id") storyId: number,
    @Query() query: any
  ): Promise<StoryCommentsResponse> {
    return await this.commentService.findStoryComments(storyId, query);
  }

  @Get("/comments/:commentId")
  @UseGuards(AuthGuard)
  async comment(
    @Param("id") storyId: number,
    @Param("commentId") commentId: number
  ): Promise<CommentsResponse> {
    return await this.commentService.findOneStoryComment(storyId, commentId);
  }

  @Post("/comments")
  @UseGuards(AuthGuard)
  async createComment(
    @Param("id") storyId: number,
    @Body("comment") createCommentDto: CreateCommentDto
  ): Promise<CommentResponseType> {
    return await this.commentService.create(storyId, createCommentDto);
  }

  @Put("/comments/:commentId")
  @UseGuards(AuthGuard)
  async updateComment(
    @Param("id") storyId: number,
    @Param("commentId") commentId: number,
    @Body("comment") updateCommentDto: UpdateCommentDto
  ): Promise<UpdateResponseType> {
    return await this.commentService.update(
      storyId,
      commentId,
      updateCommentDto
    );
  }

  @Delete("/comments/:commentId")
  @UseGuards(AuthGuard)
  async deleteComment(
    @Param("id") storyId: number,
    @Param("commentId") commentId: number
  ): Promise<String> {
    return await this.commentService.delete(storyId, commentId);
  }
}
