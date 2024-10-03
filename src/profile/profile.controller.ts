import { User } from "@app/user/decorator/user.decorator";
import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
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

  @Post(":username/follow")
  @UseGuards(AuthGuard)
  async followProfile(
    @User("id") currentUserId: number,
    @Param("username") username: string
  ): Promise<ProfileResponseInterface> {
    const result = await this.profileService.follow(currentUserId, username);
    return this.profileService.buildProfileResponse(result);
  }

  @Delete(":username/unfollow")
  @UseGuards(AuthGuard)
  async unfollowProfile(
    @User("id") currentUserId: number,
    @Param("username") username: string
  ): Promise<ProfileResponseInterface> {
    const result = await this.profileService.unfollow(currentUserId, username);
    return this.profileService.buildProfileResponse(result);
  }
}
