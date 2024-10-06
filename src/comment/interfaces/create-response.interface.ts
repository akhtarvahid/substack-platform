import { CommentEntity } from "../entities/comment.entity";

export interface CommentResponseInterface extends CommentEntity {
  storyId: number;
}
