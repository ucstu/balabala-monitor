import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { BasicIndicator } from "src/entity/basicIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import { BasicindicatorsVo } from "src/vo/basicindicators.vo";
import { BasicindicatorService } from "./basicindicator.service";

/**
 * 基础指标controllera
 */
@Controller("/performances")
export class BasicindicatorController {
  constructor(private basicindicator: BasicindicatorService) {}

  @Post("/basicindicators")
  private basicindicatorLoad(@Body() basicIndicator: BasicIndicator) {
    return this.basicindicator.upLoadBasicindicator(basicIndicator);
  }

  @Get("/basicindicators")
  totalError(@Query() basicindicatorsVo: BasicindicatorsVo) {
    return this.basicindicator.queryBasicindicator(basicindicatorsVo);
  }
}
