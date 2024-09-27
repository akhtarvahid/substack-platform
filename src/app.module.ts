import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TagModule } from '@app/tag/tag.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TagModule,
  ],
})
export class AppModule {}
