import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserResponseInterface } from './interface/userResponse.interface';

@Controller('user')
export class UserController {
     @Inject() userService: UserService;

     @Get("/health")
     health() {
        return this.userService.health();
     }

     @Post()
     async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
      const user = await this.userService.create(createUserDto);
      return this.userService.buildUserResponse(user);
     }
}
