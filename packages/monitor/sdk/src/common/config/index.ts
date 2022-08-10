import { MonitorConfig, SetOptional } from "../types";
import { client } from "../utils/apis";

let config: MonitorConfig = {
  url: "http://localhost:8080/api/v1/monitor",
  appId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  userId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  cacheMapSize: 30,
  reportTimeInterval: 1000,
};

export const setConfig = (
  _config: SetOptional<
    MonitorConfig,
    "userId" | "cacheMapSize" | "reportTimeInterval"
  >
) => {
  config = {
    ...config,
    ..._config,
  };
  client.service.httpRequest.config.BASE = config.url;
};

export const getConfig = () => {
  return config;
};
