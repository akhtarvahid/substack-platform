import { StoryEntity } from "@app/story/entities/story.entity";
import { UserEntity } from "@app/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "comments" })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @ManyToOne(() => StoryEntity, (story) => story.comments)
  story: StoryEntity;

  @Column()
  storyId: number;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  author: UserEntity;

  @Column()
  authorId: number;

  @Column({ default: 0 })
  upvoteCount: number;
}
