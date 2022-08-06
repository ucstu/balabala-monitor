import {
  BasicBehavior,
  BasicIndicator,
  ClickBehavior,
  InterfaceIndicator,
  JavaScriptError,
  PageSkipBehavior,
  PromiseError,
  ResourceError,
  ResourceIndicator,
  RoutingSkipBehavior,
  VueError,
} from "@balabala/monitor-api";

export type MonitorConfig = {
  url: string;
  appId: string;
  userId: string;
  vue?: {};
};

export type ReportDataTypes = {
  BasicIndicator: BasicIndicator;
  InterfaceIndicator: InterfaceIndicator;
  ResourceIndicator: ResourceIndicator;
  ResourceError: ResourceError;
  JavaScriptError: JavaScriptError;
  PromiseError: PromiseError;
  VueError: VueError;
  BasicBehavior: BasicBehavior;
  ClickBehavior: ClickBehavior;
  PageSkipBehavior: PageSkipBehavior;
  RoutingSkipBehavior: RoutingSkipBehavior;
};

export type Simplify<T> = {
  [P in keyof T]: T[P];
};

export type SetOptional<T, K extends keyof T> = Simplify<
  // Partial in 可有可无键值的那部分
  // Pick 必须有的键值的那部分
  Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>;
