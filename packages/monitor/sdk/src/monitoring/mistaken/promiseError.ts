import { getAppId, getPageUrl, getUserID } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

// 监听 promise 错误 缺点是获取不到列数据
export default function initPromiseError(): void {
  window.addEventListener("unhandledrejection", (e) => {
    stagingReport("PromiseError", {
      mainType: 3,
      subType: 3001,
      pageUrl: getPageUrl(),
      userID: getUserID(),
      stack: e.reason?.stack,
      errorTime: e.timeStamp,
      appId: getAppId(),
    });
  });
}
