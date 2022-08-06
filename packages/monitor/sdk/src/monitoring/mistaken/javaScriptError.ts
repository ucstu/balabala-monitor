import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default function initJavaScriptError(): void {
  window.onerror = (msg, url, line, column, error) => {
    stagingReport("JavaScriptError", {
      mainType: 2,
      subType: 2001,
      ...getBasicParams(),
      msg: typeof msg === "string" ? msg : JSON.stringify(msg),
      line: line || -1,
      column: column || -1,
      errorTime: performance.now(),
      stack: error?.stack || "no stack trace available",
    });
  };
}
