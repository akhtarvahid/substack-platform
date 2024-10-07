export class StoryCommentsResponse {
  storyComments: CommentsResponse[];
  storyCommentsCount: number;
  resultCount: number;
}

class CommentsResponse {
  storyId: number;
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
