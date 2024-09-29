import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dtos/create-product.dto';
import { StoryEntity } from './entities/story.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { User } from '@app/user/decorator/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { StoryResponseInterface } from './interfaces/story-response.interface';

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
}
