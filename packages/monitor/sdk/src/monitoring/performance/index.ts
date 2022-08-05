import monitoringBasicIndicator from "./basicIndicator";
import monitoringDrawIndicator from "./drawIndicator";
import monitoringInterfaceIndictor from "./interfaceIndictor";
import monitoringLoadIndicator from "./loadIndicator";
import monitoringOperationIndicator from "./operationIndicator";
import monitoringResourceIndicator from "./resourceIndicator";

export default function monitoringPerformanceIndicator(): void {
  monitoringBasicIndicator();
  monitoringDrawIndicator();
  monitoringInterfaceIndictor();
  monitoringLoadIndicator();
  monitoringOperationIndicator();
  monitoringResourceIndicator();
}
