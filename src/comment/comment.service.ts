import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { Repository } from "typeorm";
import { StoryEntity } from "@app/story/entities/story.entity";
import { CreateCommentDto } from "./dtos/create-comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(StoryEntity)
    private readonly storyRepository: Repository<StoryEntity>
  ) {}
  async create(id: number, createCommentDto: CreateCommentDto): Promise<any> {
    const story = await this.storyRepository.findOne({ where: { id } });
    const comment = new CommentEntity();
    Object.assign(comment, createCommentDto);

    comment.story = story;
    delete comment.story.author;
    delete comment.story.comments;
    delete comment.story.tagList;

    return await this.commentRepository.save(comment);
  }
}
