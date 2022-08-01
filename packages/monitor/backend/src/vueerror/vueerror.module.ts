import { Module } from "@nestjs/common";
import { VueerrorController } from "./vueerror.controller";
import { VueerrorService } from "./vueerror.service";

@Module({
  controllers: [VueerrorController],
  providers: [VueerrorService],
})
export class VueerrorModule {}
