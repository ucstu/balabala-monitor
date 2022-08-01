import { Module } from "@nestjs/common";
import { RoutingskipbehaviorController } from "./routingskipbehavior.controller";
import { RoutingskipbehaviorService } from "./routingskipbehavior.service";

@Module({
  controllers: [RoutingskipbehaviorController],
  providers: [RoutingskipbehaviorService],
})
export class RoutingskipbehaviorModule {}
