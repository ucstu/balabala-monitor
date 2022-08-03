import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ClickBehavior } from "src/entity/clickBehavior.entity";
import { ClickBehaviorVo } from "src/vo/ClickBehavior.vo";
import { ClickbehaviorService } from "./clickbehavior.service";

@Controller("/behaviors")
export class ClickbehaviorController {
  constructor(private clickbehaviorService: ClickbehaviorService) {}

  /**
   * 点击行为数据上传
   */
  @HttpCode(201)
  @Post("/clickbehaviors")
  clickBehaviorLoad(@Body() clickbehavior: ClickBehavior) {
    return this.clickbehaviorService.upLoadClickBehavior(clickbehavior);
  }

  /**
   * 点击行为数据查询
   */
  @Get("/clickbehaviors")
  getClickBehavior(@Query() clickbehaviorVo: ClickBehaviorVo) {
    return this.clickbehaviorService.queryClickBehavior(clickbehaviorVo);
  }
}
