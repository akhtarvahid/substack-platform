import { Body, Controller, Get, Inject, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserResponseInterface } from './interface/userResponse.interface';
import { LoginUserDto } from './dtos/login-user.dto';
import { ExpressRequest } from './interface/expressRequest.interface';
import { User } from './decorator/user.decorator';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController {
     @Inject() userService: UserService;

     @Get("/health")
     health() {
        return this.userService.health();
     }

     @Post()
     @UsePipes(new ValidationPipe())
     async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
      const user = await this.userService.create(createUserDto);
      return this.userService.buildUserResponse(user);
     }

     @Post('/login')
     @UsePipes(new ValidationPipe())
     async loginUser(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
      const user = await this.userService.login(loginUserDto);
      return this.userService.buildUserResponse(user);
     }

     @Get('user')
     async currentUser(
      @Req() request: ExpressRequest,
      @User() user: UserEntity
   ): Promise<UserResponseInterface> {
        return this.userService.buildUserResponse(user);
     }
}
