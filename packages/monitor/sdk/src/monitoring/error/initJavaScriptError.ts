import { getBasicParams } from "src/common/utils";
import { reportWithCache } from "src/reporting";

export default function initJavaScriptError(): void {
  window.onerror = (msg, line, column) => (e: { reason: { stack: any } }) => {
    reportWithCache("JavaScriptError", {
      mainType: 2,
      subType: 2001,
      msg: msg,
      line: line,
      column: column,
      errorTime: performance.now(),
      stack: e.reason?.stack,
      ...getBasicParams(),
    });
  };
}
