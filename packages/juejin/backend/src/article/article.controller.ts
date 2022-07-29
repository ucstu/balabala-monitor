import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";

import { Article } from "src/entity/article.entity";
import { RoleGuard } from "src/role.guard";
import { ArticleService } from "./article.service";

@UseGuards(RoleGuard)
@Controller("article")
@SetMetadata("roles", ["admin", "add"])
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

  @Get("/:articleId")
  selecdById(@Param("articleId") articleId) {
    return this.articleService.selectById(articleId);
  }

  //分页分类型查询文章

  @Get()
  selectByclass_page(
    @Query("class") class_type = 0,
    @Query("page") page = 1,
    @Query("size") size = 20,
    @Query("sort") sort: "ASC" | "DESC" = "DESC"
  ) {
    return this.articleService.select_class_page(class_type, page, size, sort);
  }
}
