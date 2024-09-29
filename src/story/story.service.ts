import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StoryEntity } from './entities/story.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoryService {
    constructor(@InjectRepository(StoryEntity) private readonly storyRepository: Repository<StoryEntity>) {}
    async create(storyDto: CreateStoryDto): Promise<StoryEntity> {
        return await this.storyRepository.save(storyDto);
    }
}
