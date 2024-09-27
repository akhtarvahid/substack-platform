import { Controller, Get, Inject } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';

@Controller('tags')
export class TagController {
    @Inject() tagService: TagService;
    @Get('/health')
    hello(){
        return 'UP'
    }

    @Get()
    async findAllTags(): Promise<{tags: string[]}> {
        const tags = await this.tagService.findAll();
        return {
            tags: tags.map(tag => tag.tagName)
        }
    }
}
