import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./ormconfig";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRoot(config),
    TagModule,
  ],
})
export class AppModule {}
