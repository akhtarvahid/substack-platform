import { UserEntity } from "@app/user/entities/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'stories'})
export class StoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column({ default: ''})
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column('simple-array')
    tagList: string[];

    @Column({ default: 0 })
    favoritesCount: number;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }

    @ManyToOne(() => UserEntity, (user) => user.stories)
    author: UserEntity;
}