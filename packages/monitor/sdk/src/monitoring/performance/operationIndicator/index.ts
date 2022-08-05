import framesPerSecond from "./framesPerSecond";

function monitoring(...indicators: Array<Function>): void {
  for (const indicator of indicators) {
    indicator();
  }
}

export default function monitoringOperationIndicator(): void {
  monitoring(framesPerSecond);
}
