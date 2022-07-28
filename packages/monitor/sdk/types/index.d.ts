interface MonitorConfig {
  url: string;
  vue?: Record<string, unknown>;
}
export declare class Monitor {
  url: MonitorConfig["url"];
  vue?: MonitorConfig["vue"];
  constructor(config: MonitorConfig);
  init(): void;
}
