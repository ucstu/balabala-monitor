import { JavaScriptError } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default () => {
  window.onerror = (msg, url, line, column, error) => {
    stagingReport("JavaScriptError", {
      mainType: JavaScriptError.mainType.JavaScriptError,
      subType: JavaScriptError.subType.JavaScriptError,
      ...getBasicParams(),
      url: url || "",
      msg: typeof msg === "string" ? msg : JSON.stringify(msg),
      line: line || -1,
      column: column || -1,
      errorTime: performance.now(),
      stack: error?.stack || "no stack trace available",
    });
  };
};
