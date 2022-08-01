import { MonitorConfig, setConfig, SetOptional } from "./common/config";

import { initMonitoring } from "./monitoring";

export const createMonitor = (config: SetOptional<MonitorConfig, "userId">) => {
  setConfig(config);
  initMonitoring();
};
