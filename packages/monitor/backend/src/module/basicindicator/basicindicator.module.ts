import { Module } from "@nestjs/common";
import { BasicindicatorController } from "./basicindicator.controller";
import { BasicindicatorService } from "./basicindicator.service";

@Module({
  controllers: [BasicindicatorController],
  providers: [BasicindicatorService],
})
export class BasicindicatorModule {}
