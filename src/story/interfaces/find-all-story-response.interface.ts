import { StoryEntity } from "../entities/story.entity";

export interface FindAllResponseInterface {
    stories: StoryEntity[];
    storiesCount: number;
}