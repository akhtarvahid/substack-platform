import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import * as bcrypt from 'bcrypt';

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
}