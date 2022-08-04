import { MonitorConfig, setConfig, SetOptional } from "./common/config";
import { initReportCache } from "./common/utils";

import startMonitoring from "./monitoring";

export const createMonitor = (config: SetOptional<MonitorConfig, "userId">) => {
  setConfig(config);
  initReportCache()
    .then(() => {
      startMonitoring();
    })
    .catch(() => {
      console.log("初始化失败");
    });
};
