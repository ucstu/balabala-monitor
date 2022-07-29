import {
  Body,
  Controller,
  Delete,
  Headers,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Article } from "src/entity/article.entity";
import { ArticleService } from "./article.service";

@Controller("article")
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  //新增文章
  @Post()
  insert(@Body() article: Article, @Headers() Headers) {
    const cust = this.articleService.insert(article, Headers.token);
    return cust;
  }

  //修改文章
  @Put("/:articleId")
  update(@Body() article: Article, @Param("articleId") articleId) {
    article.articleId = articleId;
    return this.articleService.update(article);
  }

  //删除文章（id）
  @Delete("/:articleId")
  delete(@Param("articleId") articleId) {
    return this.articleService.delete(articleId);
  }

  //根据id查询文章

  //分页分类型查询文章
}
