import {
  BasicBehavior,
  BasicIndicator,
  ClickBehavior,
  InterfaceIndicator,
  JavaScriptError,
  PageSkipBehavior,
  postBehaviorsBasicbehaviors,
  postBehaviorsClickbehaviors,
  postBehaviorsPageskipbehaviors,
  postBehaviorsRoutingskipbehaviors,
  postErrorsJavascripterrors,
  postErrorsPromiseerrors,
  postErrorsResourceerrors,
  postErrorsVueerrors,
  postPerformancesBasicindicators,
  postPerformancesInterfaceindicators,
  postPerformancesResourceindicators,
  PromiseError,
  ResourceError,
  ResourceIndicator,
  RoutingSkipBehavior,
  VueError,
} from "@balabala/api";
import { onBeforeUnload } from "src/common/utils";

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

const cacheMap = new Map<string, any[]>([
  ["BasicIndicator", []],
  ["InterfaceIndicator", []],
  ["ResourceIndicator", []],
  ["ResourceError", []],
  ["JavaScriptError", []],
  ["PromiseError", []],
  ["VueError", []],
  ["BasicBehavior", []],
  ["ClickBehavior", []],
  ["PageSkipBehavior", []],
  ["RoutingSkipBehavior", []],
]);
let count = 0;

onBeforeUnload(() => {
  for (const key in cacheMap) {
    const cacheItems = cacheMap.get(key) as any[];
    for (const cacheItem of cacheItems) {
      report(key as keyof PostTypes, cacheItem);
      cacheMap.set(key, []);
    }
  }
  count = 0;
});

export const report = <K extends keyof PostTypes>(
  apiId: K,
  data: PostTypes[K]
) => {
  switch (apiId) {
    case "BasicIndicator":
      postPerformancesBasicindicators(data as BasicIndicator);
      break;
    case "InterfaceIndicator":
      postPerformancesInterfaceindicators(data as InterfaceIndicator);
      break;
    case "ResourceIndicator":
      postPerformancesResourceindicators(data as ResourceIndicator);
      break;
    case "ResourceError":
      postErrorsResourceerrors(data as ResourceError);
      break;
    case "JavaScriptError":
      postErrorsJavascripterrors(data as JavaScriptError);
      break;
    case "PromiseError":
      postErrorsPromiseerrors(data as PromiseError);
      break;
    case "VueError":
      postErrorsVueerrors(data as VueError);
      break;
    case "BasicBehavior":
      postBehaviorsBasicbehaviors(data as BasicBehavior);
      break;
    case "ClickBehavior":
      postBehaviorsClickbehaviors(data as ClickBehavior);
      break;
    case "PageSkipBehavior":
      postBehaviorsPageskipbehaviors(data as PageSkipBehavior);
      break;
    case "RoutingSkipBehavior":
      postBehaviorsRoutingskipbehaviors(data as RoutingSkipBehavior);
      break;
    default:
      throw new Error(`Unknown apiId: ${apiId}`);
  }
};

export const reportWithCache = <K extends keyof PostTypes>(
  apiId: K,
  data: PostTypes[K]
) => {
  const cacheItems = cacheMap.get(apiId) as any[];
  cacheItems.push(data);
  count++;
  if (count > 10) {
    for (const key in cacheMap) {
      const cacheItems = cacheMap.get(key) as any[];
      for (const cacheItem of cacheItems) {
        report(key as keyof PostTypes, cacheItem);
        cacheMap.set(key, []);
      }
    }
    count = 0;
  }
};
