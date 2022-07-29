import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { Article } from "src/entity/article.entity";
import { responseRust } from "src/entity/responseRust";
import { QueryBuilder, Repository } from "typeorm";
import { Payload } from "src/entity/payload";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleMapper: Repository<Article>,

    private readonly authService: AuthService
  ) {}

  //插入文章

  async insert(article: Article, token: string) {
    const rust = new responseRust();

    //通过token获得电话号码；
    const tokenIf: Payload | null = this.authService.validate(token);

    article.phone = tokenIf.phone;
    //插入
    const r = await this.articleMapper.insert(article);

    if (r.raw.affectedRows > 0) {
      //插入成功
      article.articleId = r.raw.insertId;
      return rust.success_data(article);
    } else {
      // 插入失败
      return rust.error();
    }
  }

  //修改文章

  async update(article: Article) {
    const rust = new responseRust();

    const r = await this.articleMapper
      .createQueryBuilder()
      .update(article)
      .where("article_Id=:id", { id: article.articleId })
      .execute();
    if (r.affected > 0) {
      const data = await this.articleMapper
        .createQueryBuilder()
        .where("article_Id=:id", { id: article.articleId })
        .getOne();
      return rust.success_data(data);
    }

    return rust.error();
  }

  //删除文章
  async delete(articleId) {
    const rust = new responseRust();
    const r = await this.articleMapper.delete(articleId);
    if (r.affected > 0) {
      return rust.success();
    }

    return rust.error();
  }

  //查询所有文章 （可能会有类别）
}
