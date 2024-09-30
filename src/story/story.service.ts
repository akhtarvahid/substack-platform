import { Injectable } from "@nestjs/common";
import { CreateStoryDto } from "./dtos/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { StoryEntity } from "./entities/story.entity";
import { Repository } from "typeorm";
import { UserEntity } from "@app/user/entities/user.entity";
import { StoryResponseInterface } from "./interfaces/story-response.interface";
import slugify from "slugify";

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>
  ) {}

  async create(
    currentUser: UserEntity,
    storyDto: CreateStoryDto
  ): Promise<StoryEntity> {
    const story = new StoryEntity();
    Object.assign(story, storyDto);

    if (!storyDto.tagList) {
      story.tagList = [];
    }

    story.slug = this.buildSlug(storyDto.title);

    story.author = currentUser;
    return await this.storyRepository.save(story);
  }

  private buildSlug(title: string): string {
    return (
      slugify(title , { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }

  buildStoryResponse(story: StoryEntity): StoryResponseInterface {
    return {
      story,
    };
  }

  async findBySlug(slug: string): Promise<StoryEntity> {
    return await this.storyRepository.findOne({ where: { slug }});
  }
}
