import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { BasicIndicator } from "src/entity/basicIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import {
  BasicindicatorsTotalVo,
  BasicindicatorsVo,
} from "src/vo/basicindicators.vo";
import { BasicindicatorService } from "./basicindicator.service";

/**
 * 基础指标controllera
 */
@Controller("/performances")
export class BasicindicatorController {
  constructor(private basicindicator: BasicindicatorService) {}

  /**
   * 数据插入
   * @param basicIndicator
   * @returns
   */
  @HttpCode(201)
  @Post("/basicindicators")
  basicindicatorLoad(@Body() basicIndicator: BasicIndicator) {
    return this.basicindicator.upLoadBasicindicator(basicIndicator);
  }

  /**
   * 数据查询接口
   * @param basicindicatorsVo
   * @returns
   */

  @Get("/basicindicators")
  getlEasicindicatorLoad(@Query() basicindicatorsVo: BasicindicatorsVo) {
    return this.basicindicator.queryBasicindicator(basicindicatorsVo);
  }

  /**
   * 统计接口
   */
  @Get("/basicindicatorstatistics")
  totalBasicindicatorLoad(
    @Query() basicindicatorsTotalVo: BasicindicatorsTotalVo
  ) {
    return this.basicindicator.totalBasicindicator(basicindicatorsTotalVo);
  }
}
