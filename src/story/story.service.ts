import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateStoryDto } from "./dtos/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { StoryEntity } from "./entities/story.entity";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "@app/user/entities/user.entity";
import { StoryResponseInterface } from "./interfaces/story-response.interface";
import slugify from "slugify";
import { UpdateStoryDto } from "./dtos/updat-story.dto";
import { FindAllResponseInterface } from "./interfaces/find-all-story-response.interface";

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private dataSource: DataSource
  ) {}

  async findAll(id: number, query: any): Promise<FindAllResponseInterface> {
    const queryBuilder = this.dataSource
      .getRepository(StoryEntity)
      .createQueryBuilder("stories")
      .leftJoinAndSelect("stories.author", "author");

    // Filter by tag
    if (query.tag) {
      queryBuilder.andWhere("stories.tagList LIKE :tag", {
        tag: `%${query.tag}`,
      });
    }

    // Filter by author
    if (query.author) {
      const author = await this.userRepository.findOne({
        where: {
          username: query.author,
        },
      });

      if (!author) {
        throw new HttpException(
          "Username does not exist",
          HttpStatus.NOT_FOUND
        );
      }

      queryBuilder.andWhere("stories.authorId = :id", {
        id: author.id,
      });
    }
    const storiesCount = await queryBuilder.getCount();

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }
    const stories = await queryBuilder.getMany();
    return {
      stories,
      storiesCount,
    };
  }

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

  async updateStory(
    id: number,
    storyId: number,
    updateStoryDto: UpdateStoryDto
  ): Promise<StoryEntity> {
    const story = await this.storyRepository.findOne({
      where: { id: storyId },
    });

    if (!story) {
      throw new HttpException("story does not exist", HttpStatus.NOT_FOUND);
    }

    if (story.author.id !== id) {
      throw new HttpException("You are not an author", HttpStatus.FORBIDDEN);
    }

    Object.assign(story, updateStoryDto);

    return await this.storyRepository.save(story);
  }

  async delete(currentUserId: number, storyId: number): Promise<String> {
    const story = await this.storyRepository.findOne({
      where: { id: storyId },
    });
    if (storyId && story?.author?.id === currentUserId) {
      await this.storyRepository.delete(storyId);
    }
    return `Successfully delete story of ${storyId}`;
  }

  private buildSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      "-" +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }

  buildStoryResponse(story: StoryEntity): StoryResponseInterface {
    return {
      story,
    };
  }

  async findBySlug(slug: string): Promise<StoryEntity> {
    return await this.storyRepository.findOne({ where: { slug } });
  }
}
