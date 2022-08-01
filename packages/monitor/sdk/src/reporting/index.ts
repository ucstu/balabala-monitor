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
import { postPerformancesBasicindicators } from "@balabala/api";

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

export const reportWithCache = <K extends keyof PostTypes>(
  apiId: K,
  report: PostTypes[K]
) => {
  console.log("reportWithCache", apiId, report);
  if (apiId === "BasicIndicator") {
    postPerformancesBasicindicators(report as unknown as BasicIndicator).then(
      (res) => {
        console.log(res);
      }
    );
  }
};
