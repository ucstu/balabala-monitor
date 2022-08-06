import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { JavaScriptError } from "src/entity/javaScriptError.entity";
import {
  JavaScriptErrorTotalVo,
  JavaScriptErrorVo,
} from "src/vo/javascripterror.vo";
import { JavascripterrorService } from "./javascripterror.service";

@Controller("/errors")
export class JavascripterrorController {
  constructor(private readonly javascriptService: JavascripterrorService) {}
  /**
   * JavaScript错误上传
   * @param javaScriptError
   * @returns
   */
  @HttpCode(201)
  @Post("/javascripterrors")
  uploadError(@Body() javaScriptError: JavaScriptError[]) {
    return this.javascriptService.uploadError(javaScriptError);
  }
  /**
   * JavaScript错误统计
   * @param javaScriptErrorTotalVo
   * @returns
   */
  @Get("/javascripterrorstatistics")
  totalError(@Query() javaScriptErrorTotalVo: JavaScriptErrorTotalVo) {
    return this.javascriptService.totalError(javaScriptErrorTotalVo);
  }
  /**
   * JavaScript错误查询
   * @param javaScriptErrorVo
   * @returns
   */
  @Get("/javascripterrors")
  getErrorList(@Query() javaScriptErrorVo: JavaScriptErrorVo) {
    return this.javascriptService.getErrorList(javaScriptErrorVo);
  }
}
