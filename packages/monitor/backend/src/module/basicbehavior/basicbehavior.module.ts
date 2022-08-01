import { Module } from "@nestjs/common";
import { BasicbehaviorController } from "./basicbehavior.controller";
import { BasicbehaviorService } from "./basicbehavior.service";

@Module({
  controllers: [BasicbehaviorController],
  providers: [BasicbehaviorService],
})
export class BasicbehaviorModule {}
