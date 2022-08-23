import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { PageSkipBehavior } from "src/entity/pageSkipBehavior.entity";
import { PageSkipBehaviorVo } from "src/vo/PageSkipBehavior.vo";
import { PageskipbehaviorService } from "./pageskipbehavior.service";
/**
 * 页面跳转行为
 */
@Controller("/behaviors")
export class PageskipbehaviorController {
  constructor(private pageskipbehaviorService: PageskipbehaviorService) {}

  /**
   * 页面跳转行为数据上传
   */
  @HttpCode(201)
  @Post("/pageskipbehaviors")
  PageskipbehaviorLoad(@Body() pageSkipBehavior: PageSkipBehavior[]) {
    return this.pageskipbehaviorService.upLoadPageskipbehavior(
      pageSkipBehavior
    );
  }

  /**
   * 页面跳转行为数据查询
   */
  @Get("/pageskipbehaviors")
  getPageskipbehavior(@Query() pageSkipBehaviorVo: PageSkipBehaviorVo) {
    return this.pageskipbehaviorService.queryPageskipbehavior(
      pageSkipBehaviorVo
    );
  }
}
