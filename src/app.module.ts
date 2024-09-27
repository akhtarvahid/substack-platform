import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import config from "./ormconfig";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRoot(config),
    TagModule,
    UserModule,
  ],
})
export class AppModule {}
