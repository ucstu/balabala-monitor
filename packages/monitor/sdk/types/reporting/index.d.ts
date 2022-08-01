import type {
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
} from "@balabala/api";
interface PostTypes {
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
}
export declare const reportWithCache: <K extends keyof PostTypes>(
  apiId: K,
  report: PostTypes[K]
) => void;
export {};
