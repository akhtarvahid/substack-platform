import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
    health() {
        return 'UP'
    }

    async create(createUserDto: CreateUserDto) {
      return await createUserDto;
    }
}
