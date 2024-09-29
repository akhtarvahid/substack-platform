import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'stories'})
export class StoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;
}