import { monitoring } from "@/common/utils/functions";
import fullLoad from "./fullLoad";

export default function monitoringLoadIndicator(): void {
  monitoring(fullLoad);
}
