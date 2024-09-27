import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5454,
      username: 'substack',
      password: 'password',
      database: 'substack',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // path for all the entities
      synchronize: true // make it true only in dev environment not in prod environment
    }),
    TagModule,
  ],
})
export class AppModule {}
