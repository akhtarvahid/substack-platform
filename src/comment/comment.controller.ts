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
  UsePipes,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import { CommentResponseType } from "./interfaces/create-response.interface";
import { FindAllStoryCommentResponse } from "./interfaces/story-comments-res-interface";
import { UpdateCommentDto } from "./dtos/update-comment.dto";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { User } from "@app/user/decorator/user.decorator";
import { GlobalValidationPipe } from "@app/shared/pipes/global-validation.pipe";

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
  ): Promise<FindAllStoryCommentResponse> {
    return await this.commentService.findStoryComments(storyId, query);
  }

  @Get("/comments/:commentId")
  @UseGuards(AuthGuard)
  async comment(
    @Param("id") storyId: number,
    @Param("commentId") commentId: number
  ): Promise<CommentResponseType> {
    const comment = await this.commentService.findOneStoryComment(
      storyId,
      commentId
    );

    return this.commentService.buildCommentResponse(comment);
  }

  @Post("/comments")
  @UseGuards(AuthGuard)
  @UsePipes(new GlobalValidationPipe())
  async createComment(
    @Param("id") storyId: number,
    @User("id") userId: number,
    @Body("comment") createCommentDto: CreateCommentDto
  ): Promise<CommentResponseType> {
    const comment = await this.commentService.create(
      storyId,
      userId,
      createCommentDto
    );
    return this.commentService.buildCommentResponse(comment);
  }

  @Put("/comments/:commentId")
  @UseGuards(AuthGuard)
  @UsePipes(new GlobalValidationPipe())
  async updateComment(
    @Param("id") storyId: number,
    @Param("commentId") commentId: number,
    @Body("comment") updateCommentDto: UpdateCommentDto
  ): Promise<CommentResponseType> {
    const updatedComment = await this.commentService.update(
      storyId,
      commentId,
      updateCommentDto
    );

    return this.commentService.buildCommentResponse(updatedComment);
  }

  @Delete("/comments/:commentId")
  @UseGuards(AuthGuard)
  async deleteComment(
    @Param("id") storyId: number,
    @Param("commentId") commentId: number
  ): Promise<String> {
    return await this.commentService.delete(storyId, commentId);
  }

  // upvote comment of stories
  @Post("/comments/:commentId/upvote")
  @UseGuards(AuthGuard)
  async upvoteComment(
    @User("id") currentUserId: number,
    @Param("id") storyId: number,
    @Param("commentId") commentId: number
  ): Promise<CommentResponseType> {
    const comment = await this.commentService.upvote(
      currentUserId,
      storyId,
      commentId
    );
    return await this.commentService.buildCommentResponse(comment);
  }

  // downvote comment of stories
  @Delete("/comments/:commentId/downvote")
  @UseGuards(AuthGuard)
  async downvoteComment(
    @User("id") currentUserId: number,
    @Param("id") storyId: number,
    @Param("commentId") commentId: number
  ): Promise<CommentResponseType> {
    const comment = await this.commentService.downvote(
      currentUserId,
      storyId,
      commentId
    );
    return await this.commentService.buildCommentResponse(comment);
  }
}
