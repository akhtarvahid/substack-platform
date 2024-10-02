import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dtos/create-product.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { User } from '@app/user/decorator/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { FindAllResponseInterface, StoryResponseInterface } from './interfaces/story-response.interface';
import { UpdateStoryDto } from './dtos/updat-story.dto';

@Controller('story')
export class StoryController {
    @Inject() storyService: StoryService;

    @Get('/health')
    health() {
        return 'UP'
    }

    @Post()
    @UseGuards(AuthGuard)
    async createStory(
        @User() currentUser: UserEntity,
        @Body('story') storyDto: CreateStoryDto
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
    @Param("id") storyId: number,
  ): Promise<String> {
    const story = await this.storyService.delete(
      currentUserId,
      storyId,
    );
    return story
  }

  @Get('/all')
  async findAllStories(): Promise<FindAllResponseInterface> {
    const stories = await this.storyService.findAll();
    const result = stories.map(story => this.storyService.buildStoryResponse(story));
    return {
      stories: result
    };
  }

    @Get(':slug')
    async findStoryBySlug(@Param('slug') slug: string): Promise<StoryResponseInterface>{
       const story = await this.storyService.findBySlug(slug);
       return this.storyService.buildStoryResponse(story); 
    }
}

