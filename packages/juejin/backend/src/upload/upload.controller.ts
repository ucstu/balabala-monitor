import { Body, Controller, Post } from "@nestjs/common";
import { UploadService } from "./upload.service";

@Controller("images")
export class UploadController {
  constructor(private uploadservice: UploadService) {}

  @Post()
  ipload(@Body() image: string, filename: string) {
    return this.uploadservice.upload(filename, image);
  }
}
