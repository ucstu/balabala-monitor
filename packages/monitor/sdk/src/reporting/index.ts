import { ReportDataTypes } from "@/common/types";
import {
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
} from "@/common/utils/apis";
import { onBeforeUnload } from "@/common/utils/events";

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

export const reportAll = () => {
  for (const key in cacheMap) {
    const cacheItems = cacheMap.get(key) as any[];
    realTimeReport(key as keyof ReportDataTypes, cacheItems);
    cacheMap.set(key, []);
  }
  count = 0;
};

onBeforeUnload(reportAll);

export const realTimeReport = <K extends keyof ReportDataTypes>(
  apiId: K,
  data: ReportDataTypes[K][]
) => {
  switch (apiId) {
    case "BasicIndicator":
      postPerformancesBasicindicators({
        requestBody: data as ReportDataTypes["BasicIndicator"][],
      });
      break;
    case "InterfaceIndicator":
      postPerformancesInterfaceindicators({
        requestBody: data as ReportDataTypes["InterfaceIndicator"][],
      });
      break;
    case "ResourceIndicator":
      postPerformancesResourceindicators({
        requestBody: data as ReportDataTypes["ResourceIndicator"][],
      });
      break;
    case "ResourceError":
      postErrorsResourceerrors({
        requestBody: data as ReportDataTypes["ResourceError"][],
      });
      break;
    case "JavaScriptError":
      postErrorsJavascripterrors({
        requestBody: data as ReportDataTypes["JavaScriptError"][],
      });
      break;
    case "PromiseError":
      postErrorsPromiseerrors({
        requestBody: data as ReportDataTypes["PromiseError"][],
      });
      break;
    case "VueError":
      postErrorsVueerrors({
        requestBody: data as ReportDataTypes["VueError"][],
      });
      break;
    case "BasicBehavior":
      postBehaviorsBasicbehaviors({
        requestBody: data as ReportDataTypes["BasicBehavior"][],
      });
      break;
    case "ClickBehavior":
      postBehaviorsClickbehaviors({
        requestBody: data as ReportDataTypes["ClickBehavior"][],
      });
      break;
    case "PageSkipBehavior":
      postBehaviorsPageskipbehaviors({
        requestBody: data as ReportDataTypes["PageSkipBehavior"][],
      });
      break;
    case "RoutingSkipBehavior":
      postBehaviorsRoutingskipbehaviors({
        requestBody: data as ReportDataTypes["RoutingSkipBehavior"][],
      });
      break;
    default:
      throw new Error(`Unknown apiId: ${apiId}`);
  }
};

export const stagingReport = <K extends keyof ReportDataTypes>(
  apiId: K,
  data: ReportDataTypes[K]
) => {
  const cacheItems = cacheMap.get(apiId) as any[];
  cacheItems.push(data);
  count++;
  console.log(apiId, count, cacheMap.get(apiId));
  if (count > 10) {
    reportAll();
  }
};
