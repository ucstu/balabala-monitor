import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { InterfaceIndicator } from "src/entity/interfaceIndicator.entity";
import {
  InterfaceIndicatorTotalVo,
  InterfaceIndicatorVo,
} from "src/vo/interfaceIndicator.vo";
import { InterfaceindicatorService } from "./interfaceindicator.service";

@Controller("/performances")
export class InterfaceindicatorController {
  constructor(private interfaceindicatorService: InterfaceindicatorService) {}

  /**
   * 数据插入
   */
  @HttpCode(201)
  @Post("/interfaceindicators")
  interfaceindicatorLoad(@Body() interfaceIndicator: InterfaceIndicator[]) {
    return this.interfaceindicatorService.upLoadInterfaceindicator(
      interfaceIndicator
    );
  }

  /**
   * 数据查询接口
   */
  @Get("/interfaceindicators")
  getinterfaceindicator(@Query() interfaceIndicatorVo: InterfaceIndicatorVo) {
    return this.interfaceindicatorService.queryInterfaceindicator(
      interfaceIndicatorVo
    );
  }

  /**
   * 统计接口
   */

  @Get("/interfaceindicatorstatistics")
  interfaceindicatorTotal(
    @Query() interfaceIndicatorTotalVo: InterfaceIndicatorTotalVo
  ) {
    return this.interfaceindicatorService.totalinterfaceIndicator(
      interfaceIndicatorTotalVo
    );
  }
}
