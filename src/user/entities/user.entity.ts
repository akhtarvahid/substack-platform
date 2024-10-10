import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, ManyToMany, JoinTable } from "typeorm"
import * as bcrypt from 'bcrypt';
import { StoryEntity } from "@app/story/entities/story.entity";
import { CommentEntity } from "@app/comment/entities/comment.entity";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    username: string

    @Column({ default: '' })
    bio: string

    @Column({ default: '' })
    image: string

    @Column({ select: false }) // Excludes the password field from queries by default to prevent fetching it from the database
    password: string;

    @BeforeInsert()
    async hashPassword() {  // hash function is asynchronous
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToMany(() => StoryEntity, (story) => story.author)
    stories: StoryEntity[];

    @ManyToMany(() => StoryEntity)
    @JoinTable()
    favorites: StoryEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.author, { eager: true })
    comments: CommentEntity[];
}