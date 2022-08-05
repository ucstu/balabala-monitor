import resourceIndicator from "./resourceIndicator";

function monitoring(...indicators: Array<Function>): void {
  for (const indicator of indicators) {
    indicator();
  }
}

export default function monitoringResourceIndicator(): void {
  monitoring(resourceIndicator);
}
