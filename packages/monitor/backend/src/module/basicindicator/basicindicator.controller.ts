import { Body, Controller, Post } from "@nestjs/common";
import { BasicIndicator } from "src/entity/basicIndicator.entity";
import { responseRust } from "src/entity/responseRust";
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
}
