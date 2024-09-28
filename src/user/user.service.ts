import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './interface/userResponse.interface';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}
    health() {
        return 'UP'
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto);
      return await this.userRepository.save(newUser);
    }

    generateJwt(user: UserEntity): string {
        return sign({
          id: user.id,
          username: user.username,
          email: user.email
        }, JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) })
     }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
          user: {
              ...user,
              token : this.generateJwt(user)
          },
        };
      }
}
