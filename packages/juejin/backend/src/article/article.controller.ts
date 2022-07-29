import { Body, Controller, Post, Headers } from "@nestjs/common";
import { Article } from "src/entity/article.entity";
import { ArticleService } from "./article.service";

@Controller("article")
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  insert(@Body() article: Article, @Headers() Headers) {
    const cust = this.articleService.insert(article, Headers.token);
    return cust;
  }
}
