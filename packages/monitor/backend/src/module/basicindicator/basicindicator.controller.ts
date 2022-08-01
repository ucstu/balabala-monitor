import { Body, Controller, Post } from "@nestjs/common";
import { BasicIndicator } from "src/entity/basicIndicator.entity";
import { BasicindicatorService } from "./basicindicator.service";

/**
 * 基础基表controllera
 */
@Controller("/performances")
export class BasicindicatorController {
  constructor(private basicindicator: BasicindicatorService) {}

  @Post("/basicindicators")
  private basicindicatorLoad(@Body() basicIndicator: BasicIndicator) {}
}
