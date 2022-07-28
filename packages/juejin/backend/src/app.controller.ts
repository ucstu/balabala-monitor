import { Controller, Get } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppService } from "./app.service";
import { Article } from "./entity/article.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @InjectRepository(Article) private articleMapper: Repository<Article> ) { }

  @Get()
  async getHello(): Promise<any> {
   const result =  await this.articleMapper.find()
    return result;
  }

  @Get("/123")
  gettest(): string {
    return "简单测试是否正常使用";
  }
}
