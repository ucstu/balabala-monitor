import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { VueError } from "src/entity/vueError.entity";
import { VueerrorTotalVo, VueerrorVo } from "src/vo/vueerror.vo";
import { VueerrorService } from "./vueerror.service";

@Controller("/errors")
export class VueerrorController {
  constructor(private vueerrorService: VueerrorService) {}

  /**
   * Vue错误上传
   * @param vueError
   * @returns
   */
  @HttpCode(201)
  @Post("/vueerrors")
  uploadError(@Body() vueError: VueError[]) {
    return this.vueerrorService.uploadError(vueError);
  }
  /**
   * Vue错误统计
   * @param vueerrorTotalVo
   * @returns
   */
  @Get("/vueerrorstatistics")
  totalError(@Query() vueerrorTotalVo: VueerrorTotalVo) {
    return this.vueerrorService.totalError(vueerrorTotalVo);
  }
  /**
   * Vue错误查询
   * @param vueerrorVo
   * @returns
   */
  @Get("/vueerrors")
  getErrorList(@Query() vueerrorVo: VueerrorVo) {
    return this.vueerrorService.getErrorList(vueerrorVo);
  }
}
