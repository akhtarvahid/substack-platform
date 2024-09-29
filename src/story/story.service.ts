import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoryEntity } from './entities/story.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/user/entities/user.entity';

@Injectable()
export class StoryService {
    constructor(@InjectRepository(StoryEntity) private readonly storyRepository: Repository<StoryEntity>) {}
    
    async create(currentUser: UserEntity, storyDto: CreateStoryDto): Promise<StoryEntity> {
        const story = new StoryEntity();
        Object.assign(story, storyDto);

        if(!storyDto.tagList) {
            story.tagList = [];
        }

        story.slug = `${story.title}-${Math.random()*1000}`

        story.author = currentUser;
        return await this.storyRepository.save(story);
    }
}
