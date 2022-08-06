/**
 * @title PageDwellTime
 * @description Page Dwell Time，页面停留时长
 */

import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

let startTime: number;
export default function pageAccessDuration() {
  window.addEventListener("onload", () => {
    startTime = performance.now();
  });

  window.addEventListener("onbeforeunload", () => {
    const now = performance.now();
    stagingReport("BasicIndicator", {
      value: now - startTime,
      mainType: 1,
      subType: 1003,
      ...getBasicParams(),
      startTime: now,
    });
  });
}
