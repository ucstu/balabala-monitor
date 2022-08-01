import { Module } from "@nestjs/common";
import { PromiseerrorController } from "./promiseerror.controller";
import { PromiseerrorService } from "./promiseerror.service";

@Module({
  controllers: [PromiseerrorController],
  providers: [PromiseerrorService],
})
export class PromiseerrorModule {}
