import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './interface/userResponse.interface';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}
    health() {
        return 'UP'
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userFoundByEmail = await this.userRepository.findOne({
            where: {
                email: createUserDto.email
            }
        })
        const userFoundByUsername = await this.userRepository.findOne({
            where: {
                username: createUserDto.username
            }
        })
        if(userFoundByEmail || userFoundByUsername) {
           throw new HttpException('Email or username already exist', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepository.save(newUser);
    }

    async update(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
       
            const user = await this.getUserById(userId);
            Object.assign(user, updateUserDto);
            return await this.userRepository.save(user);
        
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

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email
            },
            select: ['id', 'username', 'email', 'image', 'bio', 'password']
        })

        if(!user) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const hasPasswordMatched = await compare(loginUserDto.password, user.password);
        if(!hasPasswordMatched) {
            throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        delete user.password;  // Remove the password field to prevent exposure in the response.
        return user;
    }  

    async getUserById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({
          where: {
              id
          }
        })
      }
}
