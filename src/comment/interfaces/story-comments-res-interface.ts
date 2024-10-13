import { CommentEntity } from "../entities/comment.entity";

export type CommentsResponse = Omit<CommentEntity, "story" | "author">;

export interface FindAllStoryCommentResponse {
  storyComments: CommentsResponse[];
  storyCommentsCount: number;
  resultCount: number;
}
