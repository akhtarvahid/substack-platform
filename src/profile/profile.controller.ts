import { Controller, Get } from "@nestjs/common";

@Controller("profile")
export class ProfileController {
  @Get("/health")
  health() {
    return "UP";
  }
}
