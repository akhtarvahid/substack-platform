import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

    @Column({ select: false })
    password: string;
}