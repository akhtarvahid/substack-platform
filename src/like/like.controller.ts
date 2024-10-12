import { Controller, Get } from "@nestjs/common";

@Controller("like")
export class LikeController {
  @Get("/health")
  heath() {
    return "Like is UP";
  }
}
