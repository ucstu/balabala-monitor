import firstContentfulPaint from "./firstContentfulPaint";
import firstPaint from "./firstPaint";
import largestContentfulPaint from "./largestContentfulPaint";

function monitoring(...indicators: Array<Function>): void {
  for (const indicator of indicators) {
    indicator();
  }
}

export default function monitoringBasicIndicator(): void {
  monitoring(firstContentfulPaint, firstPaint, largestContentfulPaint);
}
