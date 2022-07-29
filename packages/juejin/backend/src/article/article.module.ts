import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "src/entity/article.entity";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [TypeOrmModule.forFeature([Article])],
})
export class ArticleModule {}
