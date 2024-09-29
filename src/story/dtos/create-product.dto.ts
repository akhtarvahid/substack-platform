import { IsNotEmpty } from "class-validator";

export class CreateStoryDto {

    @IsNotEmpty()
    readonly title: string;
    readonly content: string;
}