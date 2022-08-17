import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { PromiseError } from "src/entity/promiseError.entity";
import { PromiseerrorTotalVo, PromiseerrorVo } from "src/vo/promiseerror.vo";
import { PromiseerrorService } from "./promiseerror.service";

@Controller("/errors")
export class PromiseerrorController {
  constructor(private promiseerrorService: PromiseerrorService) {}

  /**
   * Promise错误上传
   * @param promiseError
   * @returns
   */
  @HttpCode(201)
  @Post("/promiseerrors")
  uploadError(@Body() promiseError: PromiseError[]) {
    return this.promiseerrorService.uploadError(promiseError);
  }
  /**
   * Promise错误统计
   * @param promiseError
   * @returns
   */
  @Get("/promiseerrorstatistics")
  totalError(@Query() promiseerrorTotalVo: PromiseerrorTotalVo) {
    return this.promiseerrorService.totalPromiseerror(promiseerrorTotalVo);
  }
  /**
   * Promise错误查询
   * @param promiseError
   * @returns
   */
  @Get("/promiseerrors")
  getErrorList(@Query() promiseerrorVo: PromiseerrorVo) {
    return this.promiseerrorService.getErrorList(promiseerrorVo);
  }
}
