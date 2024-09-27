import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

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
}
