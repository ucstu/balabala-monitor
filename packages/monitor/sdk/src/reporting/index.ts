import { getConfig } from "@/common/config";
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

const cacheMapSize = getConfig().cacheMapSize;
const cacheMap = new Map<string, any[]>([]);
cacheMap.set("BasicIndicator", []);
cacheMap.set("InterfaceIndicator", []);
cacheMap.set("ResourceIndicator", []);
cacheMap.set("ResourceError", []);
cacheMap.set("JavaScriptError", []);
cacheMap.set("PromiseError", []);
cacheMap.set("VueError", []);
cacheMap.set("BasicBehavior", []);
cacheMap.set("ClickBehavior", []);
cacheMap.set("PageSkipBehavior", []);
cacheMap.set("RoutingSkipBehavior", []);
let count = 0;

export const reportAll = () => {
  for (const key of cacheMap.keys()) {
    if (cacheMap.get(key)!.length > 0) {
      realTimeReport(key as keyof ReportDataTypes, cacheMap.get(key)!);
      cacheMap.set(key, []);
    }
  }
  count = 0;
};

onBeforeUnload(reportAll);
setInterval(reportAll, getConfig().reportTimeInterval);

export const realTimeReport = <K extends keyof ReportDataTypes>(
  apiId: K,
  data: ReportDataTypes[K][]
) => {
  switch (apiId) {
    case "BasicIndicator":
      postPerformancesBasicindicators({
        requestBody: data as ReportDataTypes["BasicIndicator"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "InterfaceIndicator":
      postPerformancesInterfaceindicators({
        requestBody: data as ReportDataTypes["InterfaceIndicator"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "ResourceIndicator":
      postPerformancesResourceindicators({
        requestBody: data as ReportDataTypes["ResourceIndicator"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "ResourceError":
      postErrorsResourceerrors({
        requestBody: data as ReportDataTypes["ResourceError"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "JavaScriptError":
      postErrorsJavascripterrors({
        requestBody: data as ReportDataTypes["JavaScriptError"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "PromiseError":
      postErrorsPromiseerrors({
        requestBody: data as ReportDataTypes["PromiseError"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "VueError":
      postErrorsVueerrors({
        requestBody: data as ReportDataTypes["VueError"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "BasicBehavior":
      postBehaviorsBasicbehaviors({
        requestBody: data as ReportDataTypes["BasicBehavior"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "ClickBehavior":
      postBehaviorsClickbehaviors({
        requestBody: data as ReportDataTypes["ClickBehavior"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "PageSkipBehavior":
      postBehaviorsPageskipbehaviors({
        requestBody: data as ReportDataTypes["PageSkipBehavior"][],
      }).catch((e) => {
        console.log(e);
      });
      break;
    case "RoutingSkipBehavior":
      postBehaviorsRoutingskipbehaviors({
        requestBody: data as ReportDataTypes["RoutingSkipBehavior"][],
      }).catch((e) => {
        console.log(e);
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
  if (count >= cacheMapSize) {
    reportAll();
  }
};
