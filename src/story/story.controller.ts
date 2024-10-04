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
  ValidationPipe,
} from "@nestjs/common";
import { StoryService } from "./story.service";
import { CreateStoryDto } from "./dtos/create-product.dto";
import { UserEntity } from "@app/user/entities/user.entity";
import { User } from "@app/user/decorator/user.decorator";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { StoryResponseInterface } from "./interfaces/story-response.interface";
import { UpdateStoryDto } from "./dtos/updat-story.dto";
import { FindAllResponseInterface } from "./interfaces/find-all-story-response.interface";
import { GlobalValidationPipe } from "@app/shared/pipes/global-validation.pipe";

@Controller("story")
export class StoryController {
  @Inject() storyService: StoryService;

  @Get("/health")
  health() {
    return "UP";
  }

  // Public get all stories API
  @Get("/all")
  async findAllStories(
    @User("id") currentUserId: number,
    @Query() query: any
  ): Promise<FindAllResponseInterface> {
    const stories = await this.storyService.findAll(currentUserId, query);
    return stories;
  }

  // Logged in user story feed API
  @Get("/feed")
  @UseGuards(AuthGuard)
  async getStoryFeed(
    @User("id") currentUserId: number,
    @Query() query: any
  ): Promise<FindAllResponseInterface> {
    const stories = await this.storyService.feed(currentUserId, query);
    return stories;
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new GlobalValidationPipe())
  async createStory(
    @User() currentUser: UserEntity,
    @Body("story") storyDto: CreateStoryDto
  ): Promise<StoryResponseInterface> {
    const story = await this.storyService.create(currentUser, storyDto);
    return this.storyService.buildStoryResponse(story);
  }

  // Private update Story API
  @Put(":id")
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateStory(
    @User("id") currentUserId: number,
    @Param("id") storyId: number,
    @Body("story") updateStoryDto: UpdateStoryDto
  ) {
    const story = await this.storyService.updateStory(
      currentUserId,
      storyId,
      updateStoryDto
    );
    return await this.storyService.buildStoryResponse(story);
  }

  // Protected delete story API
  @Delete(":id")
  @UseGuards(AuthGuard)
  async deleteStory(
    @User("id") currentUserId: number,
    @Param("id") storyId: number
  ): Promise<String> {
    const story = await this.storyService.delete(currentUserId, storyId);
    return story;
  }

  @Get(":slug")
  async findStoryBySlug(
    @Param("slug") slug: string
  ): Promise<StoryResponseInterface> {
    const story = await this.storyService.findBySlug(slug);
    return this.storyService.buildStoryResponse(story);
  }

  // added story to user's favorite list
  @Post(":slug/favorite")
  @UseGuards(AuthGuard)
  async addStoryToFavorites(
    @User("id") currentUserId: number,
    @Param("slug") slug: string
  ): Promise<StoryResponseInterface> {
    const story = await this.storyService.favorite(currentUserId, slug);
    return await this.storyService.buildStoryResponse(story);
  }

  // Remove story from user's favorite list
  @Delete(":slug/favorite")
  @UseGuards(AuthGuard)
  async removeStoryToFavorites(
    @User("id") currentUserId: number,
    @Param("slug") slug: string
  ): Promise<StoryResponseInterface> {
    const story = await this.storyService.unfavorite(currentUserId, slug);
    return await this.storyService.buildStoryResponse(story);
  }
}
