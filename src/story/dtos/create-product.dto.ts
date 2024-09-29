import { IsNotEmpty } from "class-validator";

export class CreateStoryDto {

    @IsNotEmpty()
    readonly title: string;

    readonly description: string;

    @IsNotEmpty()
    readonly body: string;

    @IsNotEmpty()
    readonly tagList: string[];
}
