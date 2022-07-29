import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // async getHello(): Promise<any> {
  //   const result = await this.articleMapper.find();
  //   return result;
  // }

  @Get("/123")
  gettest(): string {
    return "简单测试是否正常使用";
  }
}
