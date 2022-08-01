import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ResourceError } from "src/entity/resourceError.entity";
import { responseRust } from "src/entity/responseRust";
import { ResourceerrorTotalVo } from "src/vo/resourceerror.vo";
import { ResourceerrorService } from "./resourceerror.service";

@Controller("/errors")
export class ResourceerrorController {
  constructor(private resourceerrorService: ResourceerrorService) {}
  @HttpCode(201)
  @Post("/resourceerrors")
  uploadError(@Body() resourceError: ResourceError): Promise<responseRust> {
    return this.resourceerrorService.uploadError(resourceError);
  }
  @Get("/resourceerrorstatistics")
  totalError(@Query() resourceerrorTotalVo: ResourceerrorTotalVo) {
    return this.resourceerrorService.totalError(resourceerrorTotalVo);
  }
}
