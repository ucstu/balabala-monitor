import fullLoad from "./fullLoad";

function monitoring(...indicators: Array<Function>): void {
  for (const indicator of indicators) {
    indicator();
  }
}

export default function monitoringLoadIndicator(): void {
  monitoring(fullLoad);
}
