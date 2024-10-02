import { StoryEntity } from "../entities/story.entity";

export interface StoryResponseInterface {
    story: StoryEntity;
}
export interface FindAllResponseInterface {
    stories: StoryResponseInterface[];
}