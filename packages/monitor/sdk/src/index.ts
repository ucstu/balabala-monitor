import { setConfig } from "./common/config";
import { MonitorConfig, SetOptional } from "./common/types";
import startMonitoring from "./monitoring";

export const createMonitor = (config: SetOptional<MonitorConfig, "userId">) => {
  setConfig(config);
  startMonitoring();
};
