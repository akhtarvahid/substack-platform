import { StoryEntity } from "../entities/story.entity";

export type StoryType = Omit<StoryEntity, "updateTimestamp">;
