import { Module } from "@nestjs/common";
import { InterfaceindicatorController } from "./interfaceindicator.controller";
import { InterfaceindicatorService } from "./interfaceindicator.service";

@Module({
  controllers: [InterfaceindicatorController],
  providers: [InterfaceindicatorService],
})
export class InterfaceindicatorModule {}
