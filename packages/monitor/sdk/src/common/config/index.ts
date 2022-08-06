import { MonitorConfig, SetOptional } from "../types";

let config: MonitorConfig = {
  url: "http://localhost:8080/api/v1/monitor",
  appId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  userId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
};

export const setConfig = (_config: SetOptional<MonitorConfig, "userId">) => {
  config = {
    ...config,
    ..._config,
  };
};

export const getConfig = () => {
  return config;
};
