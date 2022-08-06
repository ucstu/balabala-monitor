import { monitoring } from "@/common/utils/functions";
import framesPerSecond from "./framesPerSecond";

export default function monitoringOperationIndicator(): void {
  monitoring(framesPerSecond);
}
