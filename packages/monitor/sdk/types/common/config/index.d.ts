declare type Simplify<T> = {
  [P in keyof T]: T[P];
};
export declare type SetOptional<T, K extends keyof T> = Simplify<
  Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>;
export interface MonitorConfig {
  url: string;
  appId: string;
  userId: string;
  vue?: {};
}
export declare const setConfig: (
  _config: SetOptional<MonitorConfig, "userId">
) => void;
export declare const getConfig: () => MonitorConfig;
export {};
