import { Module } from "@nestjs/common";
import { PageskipbehaviorController } from "./pageskipbehavior.controller";
import { PageskipbehaviorService } from "./pageskipbehavior.service";

@Module({
  controllers: [PageskipbehaviorController],
  providers: [PageskipbehaviorService],
})
export class PageskipbehaviorModule {}
