import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dtos/create-product.dto';

@Injectable()
export class StoryService {

    async create(storyDto: CreateStoryDto): Promise<any> {
        return {
            ...storyDto
        }
    }
}
