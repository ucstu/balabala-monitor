import { Module } from "@nestjs/common";
import { InterfaceerrorsController } from "./interfaceerrors.controller";
import { InterfaceerrorsService } from "./interfaceerrors.service";

@Module({
  controllers: [InterfaceerrorsController],
  providers: [InterfaceerrorsService],
})
export class InterfaceerrorsModule {}
