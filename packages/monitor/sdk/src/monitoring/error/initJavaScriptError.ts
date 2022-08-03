import { getBasicParams } from "src/common/utils";
import { reportWithCache } from "src/reporting";

export default function initJavaScriptError(): void {
  window.onerror = (msg, url, line, column, error) => {
    reportWithCache("JavaScriptError", {
      mainType: 2,
      subType: 2001,
      msg: typeof msg === "string" ? msg : JSON.stringify(msg),
      line: line || -1,
      column: column || -1,
      errorTime: performance.now(),
      stack: error?.stack || "no stack trace available",
      ...getBasicParams(),
    });
  };
}
