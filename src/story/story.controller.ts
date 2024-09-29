import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dtos/create-product.dto';
import { StoryEntity } from './entities/story.entity';

@Controller('Story')
export class StoryController {
    @Inject() StoryService: StoryService;

    @Get('/health')
    health() {
        return 'UP'
    }

    @Post()
    async createStory(@Body('story') storyDto: CreateStoryDto): Promise<StoryEntity> {
        return await this.StoryService.create(storyDto)
    }
}
