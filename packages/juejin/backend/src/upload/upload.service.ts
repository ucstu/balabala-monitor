import { Injectable } from "@nestjs/common";
import { responseRust } from "src/entity/responseRust";
import { uploadImage } from "./upload.utils";

@Injectable()
export class UploadService {
  upload(filename: string, image: string) {
    const rust = new responseRust();
    const url = uploadImage(filename, image);
    if (url != null) {
      return rust.success_data(url);
    }

    return rust.error();
  }
}
