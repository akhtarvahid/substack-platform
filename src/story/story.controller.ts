import { Body, Controller, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dtos/create-product.dto';
import { StoryEntity } from './entities/story.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { User } from '@app/user/decorator/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { StoryResponseInterface } from './interfaces/story-response.interface';
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

    @Put(":id")
    @UseGuards(AuthGuard)
    async updateStory(
        @Param('storyId') storyId: number,
        @Body('story') storyDto: UpdateStoryDto
    ): Promise<StoryResponseInterface> {
        const story = await this.storyService.update(storyId, storyDto);
        return this.storyService.buildStoryResponse(story);
    }

    @Get(':slug')
    async findStoryBySlug(@Param('slug') slug: string): Promise<StoryResponseInterface>{
       const story = await this.storyService.findBySlug(slug);
       return this.storyService.buildStoryResponse(story); 
    }
}

