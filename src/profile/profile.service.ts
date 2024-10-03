import { UserEntity } from "@app/user/entities/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileType } from "./interface/profile.type";
import { ProfileResponseInterface } from "./interface/profile-response.interface";
import { FollowEntity } from "./entities/follow.entity";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>
  ) {}

  async getProfile(userId: number, username: string): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new HttpException("Profile does not exist", HttpStatus.NOT_FOUND);
    }

    return { ...user, following: false };
  }

  async follow(
    currentUserId: number,
    profile_username: string
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({
      where: { username: profile_username },
    });

    if (!user) {
      throw new HttpException("Profile does not exist", HttpStatus.NOT_FOUND);
    }

    if (user.id === currentUserId) {
      throw new HttpException(
        "Follower and Following cant be equal",
        HttpStatus.BAD_REQUEST
      );
    }

    const follow = await this.followRepository.findOne({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    if (!follow) {
      const followToCreate = new FollowEntity();
      (followToCreate.followerId = currentUserId),
        (followToCreate.followingId = user.id),
        await this.followRepository.save(followToCreate);
    }

    return { ...user, following: true };
  }

  buildProfileResponse(profile): ProfileResponseInterface {
    // discard disclosing email.
    delete profile.email;
    return {
      profile,
    };
  }
}
