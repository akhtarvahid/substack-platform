import { Controller, Get } from "@nestjs/common";

@Controller("comments")
export class CommentsController {
  @Get("/health")
  health() {
    return "UP";
  }
}
