import interfaceIndictor from "./interfaceIndictor";

function monitoring(...indicators: Array<Function>): void {
  for (const indicator of indicators) {
    indicator();
  }
}

export default function monitoringInterfaceIndictor(): void {
  monitoring(interfaceIndictor);
}
