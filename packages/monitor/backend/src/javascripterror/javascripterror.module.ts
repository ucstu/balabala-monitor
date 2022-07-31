import { Module } from "@nestjs/common";
import { JavascripterrorController } from "./javascripterror.controller";
import { JavascripterrorService } from "./javascripterror.service";

@Module({
  controllers: [JavascripterrorController],
  providers: [JavascripterrorService],
})
export class JavascripterrorModule {}
