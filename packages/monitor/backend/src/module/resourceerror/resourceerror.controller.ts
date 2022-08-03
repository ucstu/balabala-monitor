import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ResourceError } from "src/entity/resourceError.entity";
import { responseRust } from "src/entity/responseRust";
import { ResourceerrorTotalVo, ResourceerrorVo } from "src/vo/resourceerror.vo";
import { ResourceerrorService } from "./resourceerror.service";

@Controller("/errors")
export class ResourceerrorController {
  constructor(private resourceerrorService: ResourceerrorService) {}

  /**
   * 上传资源错误信息
   * @param resourceError
   * @returns
   */
  @HttpCode(201)
  @Post("/resourceerrors")
  uploadError(@Body() resourceError: ResourceError): Promise<responseRust> {
    return this.resourceerrorService.uploadError(resourceError);
  }
  /**
   * 获取资源错误统计信息
   * @param resourceerrorTotalVo
   * @returns
   */
  @Get("/resourceerrorstatistics")
  totalError(@Query() resourceerrorTotalVo: ResourceerrorTotalVo) {
    return this.resourceerrorService.totalError(resourceerrorTotalVo);
  }
  /**
   * 获取资源错误列表
   * @param resourceerrorVo
   * @returns
   */
  @Get("/resourceerrors")
  getErrorList(@Query() resourceerrorVo: ResourceerrorVo) {
    return this.resourceerrorService.getErrorList(resourceerrorVo);
  }
}
