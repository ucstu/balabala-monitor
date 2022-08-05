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
import { cacheDataBase } from "../common/utils";

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
  const request = cacheDataBase
    .transaction(["cache"], "readwrite")
    .objectStore("cache")
    .add({ apiId, report });

  request.onsuccess = function (event) {
    console.log("数据写入成功", { apiId, report });
  };

  request.onerror = function (event) {
    console.log("数据写入失败");
  };
};
