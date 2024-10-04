import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserResponseInterface } from "./interface/userResponse.interface";
import { LoginUserDto } from "./dtos/login-user.dto";
import { ExpressRequest } from "./interface/expressRequest.interface";
import { User } from "./decorator/user.decorator";
import { UserEntity } from "./entities/user.entity";
import { AuthGuard } from "./guards/auth.guard";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { GlobalValidationPipe } from "@app/shared/pipes/global-validation.pipe";

@Controller("users")
export class UserController {
  @Inject() userService: UserService;

  @Get("/health")
  health() {
    return this.userService.health();
  }

  @Post()
  @UsePipes(new GlobalValidationPipe())
  async createUser(
    @Body("user") createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post("/login")
  @UsePipes(new GlobalValidationPipe())
  async loginUser(
    @Body("user") loginUserDto: LoginUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get("user")
  @UseGuards(AuthGuard)
  async currentUser(
    @Req() request: ExpressRequest,
    @User() user: UserEntity
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put("/:id")
  @UseGuards(AuthGuard)
  async updateUser(
    @User("id") userId: number,
    @Body("user") updateUserDto: UpdateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.update(userId, updateUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard)
  async deleteUser(@User("id") userId: number): Promise<String> {
    return await this.userService.delete(userId);
  }
}
