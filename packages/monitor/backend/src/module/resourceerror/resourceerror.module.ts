import { Module } from "@nestjs/common";
import { ResourceerrorController } from "./resourceerror.controller";
import { ResourceerrorService } from "./resourceerror.service";

@Module({
  controllers: [ResourceerrorController],
  providers: [ResourceerrorService],
})
export class ResourceerrorModule {}
