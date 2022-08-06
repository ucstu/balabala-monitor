import { MonitorConfig, SetOptional } from "../types";
export declare const setConfig: (
  _config: SetOptional<MonitorConfig, "userId">
) => void;
export declare const getConfig: () => MonitorConfig;
