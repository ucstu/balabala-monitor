import { Controller, Get, Query } from "@nestjs/common";
import {
  InterfaceerrorsTotalVo,
  InterfaceerrorsVo,
} from "src/vo/interfaceerrors.vo";
import { InterfaceerrorsService } from "./interfaceerrors.service";
/**
 * 接口错误
 */
@Controller("/errors")
export class InterfaceerrorsController {
  constructor(private interfaceerrorsService: InterfaceerrorsService) {}

  /**
   * 接口错误查询
   * @param querys
   * @returns
   */
  @Get("/interfaceerrors")
  getInterfaceerrors(@Query() querys: InterfaceerrorsVo) {
    return this.interfaceerrorsService.getInterfaceerrors(querys);
  }

  /**
   * 统计接口错误
   * @param querys
   * @returns
   */
  @Get("/interfaceerrorstatistics")
  totalInterfaceerrorstatistics(@Query() querys: InterfaceerrorsTotalVo) {
    return this.interfaceerrorsService.totalInterfaceerrorstatistics(querys);
  }
}
