import { User } from "@app/user/decorator/user.decorator";
import { Controller, Get, Inject, Param, UseGuards } from "@nestjs/common";
import { ProfileResponseInterface } from "./interface/profile-response.interface";
import { ProfileService } from "./profile.service";
import { AuthGuard } from "@app/user/guards/auth.guard";

@Controller("profile")
export class ProfileController {
  @Inject() profileService: ProfileService;
  @Get("/health")
  health() {
    return "UP";
  }

  @Get(":username")
  @UseGuards(AuthGuard)
  async getProfile(
    @User("id") currentUserId: number,
    @Param("username") username: string
  ): Promise<ProfileResponseInterface> {
    const result = await this.profileService.getProfile(
      currentUserId,
      username
    );
    return this.profileService.buildProfileResponse(result);
  }
}
