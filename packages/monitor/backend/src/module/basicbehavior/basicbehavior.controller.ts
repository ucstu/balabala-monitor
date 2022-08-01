import { Controller } from "@nestjs/common";
import { BasicbehaviorService } from "./basicbehavior.service";

/**
 * 基础指标接口
 *
 */
@Controller("basicbehavior")
export class BasicbehaviorController {
  //BasicbehaviorService
  constructor(private basicindicatorService: BasicbehaviorService) {}
}
