import { initPerformanceMonitoring } from "./monitoring";

interface MonitorConfig {
  url: string;
  vue?: {};
}

export class Monitor {
  url: MonitorConfig["url"];
  vue?: MonitorConfig["vue"];

  constructor(config: MonitorConfig) {
    this.url = config.url;
    this.vue = config.vue;
    this.init();
  }

  init() {
    initPerformanceMonitoring();
  }
}
