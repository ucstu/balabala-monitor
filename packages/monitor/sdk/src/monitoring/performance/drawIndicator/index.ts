import firstScreenLoad from "./firstScreenLoad";

function monitoring(...indicators: Array<Function>): void {
  for (const indicator of indicators) {
    indicator();
  }
}

export default function monitoringDrawIndicator(): void {
  monitoring(firstScreenLoad);
}
