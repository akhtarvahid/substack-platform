import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TagModule } from "@app/tag/tag.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthMiddleware } from "./user/middlewares/auth.middleware";
import { StoryModule } from "./story/story.module";
import { ProfileModule } from "./profile/profile.module";
import { CommentsModule } from './comments/comments.module';
import ormConfig from "./ormconfig";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRoot(ormConfig),
    TagModule,
    UserModule,
    StoryModule,
    ProfileModule,
    CommentsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
