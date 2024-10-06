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
import { FollowEntity } from "@app/profile/entities/follow.entity";

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
    private dataSource: DataSource
  ) {}

  async findAll(
    currentUserId: number,
    query: any
  ): Promise<FindAllResponseInterface> {
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

    if (query.favorited) {
      const author = await this.userRepository.findOne({
        where: { username: query.favorited },
        relations: ["favorites"],
      });

      const ids = author?.favorites.map((fav) => fav.id);
      if (ids.length > 0) {
        queryBuilder.andWhere("stories.id IN (:...ids)", { ids });
      } else {
        // to return [] if ids don't exist
        queryBuilder.andWhere("1=0");
      }
    }

    queryBuilder.orderBy("stories.createdAt", "DESC");
    const storiesCount = await queryBuilder.getCount();

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    let favoriteIds: number[] = [];
    if (currentUserId) {
      const currentUser = await this.userRepository.findOne({
        where: { id: currentUserId },
        relations: ["favorites"],
      });

      favoriteIds = currentUser.favorites.map((fav) => fav.id);
    }

    const stories = await queryBuilder.getMany();
    const favoriteStories = stories.map((story) => {
      const favorited = favoriteIds.includes(story.id);
      return { ...story, favorited };
    });
    return { stories: favoriteStories, storiesCount };
  }

  async storyFeeds(
    currentUserId: number,
    query: any
  ): Promise<FindAllResponseInterface> {
    const follows = await this.followRepository.find({
      where: {
        followerId: currentUserId,
      },
    });

    if (follows.length === 0) {
      return {
        stories: [],
        storiesCount: 0,
      };
    }

    const followingProfileIds = follows.map((foll) => foll.followingId);
    const queryBuilder = this.dataSource
      .getRepository(StoryEntity)
      .createQueryBuilder("stories")
      .leftJoinAndSelect("stories.author", "author")
      .where("stories.authorId IN (:...ids)", { ids: followingProfileIds });

    queryBuilder.orderBy("stories.createdAt", "DESC");
    const storiesCount = await queryBuilder.getCount();

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const stories = await queryBuilder.getMany();
    return { stories, storiesCount };
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
    story.comments = [];
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

  buildStoryResponse(story: StoryEntity): StoryResponseInterface {
    return {
      story,
    };
  }

  async findBySlug(slug: string): Promise<StoryEntity> {
    return await this.storyRepository.findOne({ where: { slug } });
  }

  async favorite(currentUserId: number, slug: string): Promise<StoryEntity> {
    const story = await this.findBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
      relations: ["favorites"],
    });
    const isNotFavorite =
      user.favorites.findIndex((storyExist) => storyExist.id === story.id) ===
      -1;

    if (isNotFavorite) {
      user.favorites.push(story);
      story.favoritesCount++;
      await this.userRepository.save(user);
      await this.storyRepository.save(story);
    }
    return story;
  }

  async unfavorite(currentUserId: number, slug: string): Promise<StoryEntity> {
    const story = await this.findBySlug(slug);
    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
      relations: ["favorites"],
    });
    const storyIndex = user.favorites.findIndex(
      (storyInFavorites) => storyInFavorites.id === story.id
    );

    if (storyIndex >= 0) {
      user.favorites.splice(storyIndex, 1);

      story.favoritesCount--;
      await this.userRepository.save(user);
      await this.storyRepository.save(story);
    }
    return story;
  }

  private buildSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      "-" +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
