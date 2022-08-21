import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { BasicBehavior } from "src/entity/basicBehavior.entity";
import { BaseQueryVo } from "src/vo/base.vo";
import { BasicBehaviorTotalVo, BasicBehaviorVo } from "src/vo/BasicBehavior.vo";
import { BasicbehaviorService } from "./basicbehavior.service";

/**
 * 基础行为接口
 *
 */
@Controller("/behaviors")
export class BasicbehaviorController {
  //BasicbehaviorService
  constructor(private basicbehaviorService: BasicbehaviorService) {}

  /**
   * 基础行为数据插入
   */
  @HttpCode(201)
  @Post("/basicbehaviors")
  totalBasicBehaviorLoad(@Body() basicIndicator: BasicBehavior[]) {
    return this.basicbehaviorService.upLoadBasicBehavior(basicIndicator);
  }

  /**
   * 基础行为数据查询
   */
  @Get("/basicbehaviors")
  getBasicBehaviorLoad(@Query() basicIndicatorVo: BasicBehaviorVo) {
    return this.basicbehaviorService.queryBasicBehavior(basicIndicatorVo);
  }

  /**
   * 基础行为数据统计
   */
  @Get("/basicbehaviorstatistics")
  totalBasicBehavior(@Query() basicIndicatorTotalVo: BasicBehaviorTotalVo) {
    return this.basicbehaviorService.totalBasicBehavior(basicIndicatorTotalVo);
  }

  /**
   * 用户行为列表
   */
  @Get("/userAction")
  getUserActionList(@Query() querysVo: BaseQueryVo) {
    return this.basicbehaviorService.getUserActionList(querysVo);
  }
}
