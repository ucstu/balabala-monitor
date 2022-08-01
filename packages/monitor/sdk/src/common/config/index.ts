let config: MonitorConfig = {
  url: "http://localhost:8080/api/v1/monitor",
  appId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
  userId: "5e8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8",
};

type Simplify<T> = {
  [P in keyof T]: T[P];
};

export type SetOptional<T, K extends keyof T> = Simplify<
  // Partial in 可有可无键值的那部分
  // Pick 必须有的键值的那部分
  Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>;

export interface MonitorConfig {
  url: string;
  appId: string;
  userId: string;
  vue?: {};
}

export const setConfig = (_config: SetOptional<MonitorConfig, "userId">) => {
  config = {
    ...config,
    ..._config,
  };
};

export const getConfig = () => {
  return config;
};
