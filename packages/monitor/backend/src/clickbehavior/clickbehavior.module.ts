import { Module } from "@nestjs/common";
import { ClickbehaviorController } from "./clickbehavior.controller";
import { ClickbehaviorService } from "./clickbehavior.service";

@Module({
  controllers: [ClickbehaviorController],
  providers: [ClickbehaviorService],
})
export class ClickbehaviorModule {}
