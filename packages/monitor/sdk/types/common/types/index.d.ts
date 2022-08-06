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
export declare type MonitorConfig = {
  url: string;
  appId: string;
  userId: string;
  vue?: {};
};
export declare type ReportDataTypes = {
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
export declare type Simplify<T> = {
  [P in keyof T]: T[P];
};
export declare type SetOptional<T, K extends keyof T> = Simplify<
  Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>;
