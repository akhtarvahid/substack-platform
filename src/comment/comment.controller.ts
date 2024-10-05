import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dtos/create-comment.dto";

@Controller("stories/:id")
export class CommentController {
  @Inject() commentService: CommentService;

  @Get("/health")
  health() {
    return "COMMENTS UP";
  }

  @Post("/comments")
  async createComment(@Param("id") id: number, 
    @Body('comment') createCommentDto: CreateCommentDto): Promise<any> {
    return await this.commentService.create(id, createCommentDto);
  }
}
