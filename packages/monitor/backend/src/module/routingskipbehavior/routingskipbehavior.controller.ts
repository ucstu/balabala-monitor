import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { RoutingSkipBehavior } from "src/entity/routingSkipBehavior.entity";
import { RoutingSkipBehaviorVo } from "src/vo/RoutingSkipBehavior.vo";
import { RoutingskipbehaviorService } from "./routingskipbehavior.service";

@Controller("/behaviors")
export class RoutingskipbehaviorController {
  constructor(private routingskipbehaviorService: RoutingskipbehaviorService) {}

  /**
   * 路由跳转行为数据上传
   */
  @HttpCode(201)
  @Post("/routingskipbehaviors")
  routingSkipBehavior(@Body() routingSkipBehavior: RoutingSkipBehavior[]) {
    return this.routingskipbehaviorService.upLoadRoutingSkipBehavior(
      routingSkipBehavior
    );
  }

  /**
   * 路由跳转行为数据查询
   */
  @Get("/routingskipbehaviors")
  getRoutingSkipBehavior(
    @Query() routingSkipBehaviorVo: RoutingSkipBehaviorVo
  ) {
    return this.routingskipbehaviorService.queryRoutingSkipBehavior(
      routingSkipBehaviorVo
    );
  }
}
