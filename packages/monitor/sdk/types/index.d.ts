interface MonitorConfig {
  url: string;
  vue?: {};
}
export declare class Monitor {
  url: MonitorConfig["url"];
  vue?: MonitorConfig["vue"];
  constructor(config: MonitorConfig);
  init(): void;
}
export {};
