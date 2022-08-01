import { Module } from "@nestjs/common";
import { ResourceindicatorController } from "./resourceindicator.controller";
import { ResourceindicatorService } from "./resourceindicator.service";

@Module({
  controllers: [ResourceindicatorController],
  providers: [ResourceindicatorService],
})
export class ResourceindicatorModule {}
