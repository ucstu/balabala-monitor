import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/entity/article.entity";
import { responseRust } from "src/entity/responseRust";
import { Repository } from "typeorm";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleMapper: Repository<Article>
  ) {}

  //插入文章

  async insert(article: Article, token: string) {
    const rust = new responseRust();

    //通过token获得电话号码；
    article.phone = token;
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

  //删除文章

  //查询所有文章 （可能会有类别）
}
