import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configValidationSchema } from "./config.schema";
import { TagModule } from './tag/tag.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    TagModule,
  ],
})
export class AppModule {}
