import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ResourceIndicator } from "src/entity/resourceIndicator.entity";
import {
  ResourceIndicatorTotalVo,
  ResourceIndicatorVo,
} from "src/vo/resourceIndicator.vo";
import { ResourceindicatorService } from "./resourceindicator.service";

@Controller("/performances")
export class ResourceindicatorController {
  constructor(private resourceindicatorService: ResourceindicatorService) {}

  /**
   * 资源指标插入
   */
  @HttpCode(201)
  @Post("/resourceindicators")
  resourceindicatorLoad(@Body() resourceIndicator: ResourceIndicator) {
    return this.resourceindicatorService.upLoadResourceIndicator(
      resourceIndicator
    );
  }

  /**
   * 资源指标查询接口
   */
  @Get("/resourceindicators")
  getResourceindicator(@Query() resourceIndicatorVo: ResourceIndicatorVo) {
    return this.resourceindicatorService.queryResourceIndicator(
      resourceIndicatorVo
    );
  }

  /**
   * 资源指标统计接口
   */

  @Get("/resourceindicatorstatistics")
  ResourceindicatorTotal(
    @Query() resourceIndicatorTotalVo: ResourceIndicatorTotalVo
  ) {
    return this.resourceindicatorService.totalinterfaceIndicator(
      resourceIndicatorTotalVo
    );
  }
}
