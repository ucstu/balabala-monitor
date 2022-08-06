import { MonitorConfig, setConfig, SetOptional } from "./common/config";

import startMonitoring from "./monitoring";

export const createMonitor = (config: SetOptional<MonitorConfig, "userId">) => {
  setConfig(config);
  startMonitoring();
};
