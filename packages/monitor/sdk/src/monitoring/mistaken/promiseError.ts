import { PromiseError } from "@/common/utils/apis";
import { getAppId, getPageUrl, getUserID } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default () => {
  window.addEventListener("unhandledrejection", (e) => {
    stagingReport("PromiseError", {
      mainType: PromiseError.mainType.PromiseError,
      subType: PromiseError.subType.PromiseError,
      pageUrl: getPageUrl(),
      userID: getUserID(),
      stack: e.reason?.stack,
      errorTime: e.timeStamp,
      appId: getAppId(),
    });
  });
};
