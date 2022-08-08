/**
 * @title pageAccessDepth
 * @description Page Access Depth，页面访问深度
 */

import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

let timer: NodeJS.Timeout;
let startTime = 0;
let hasReport = false;
let pageHeight = 0;
let scrollTop = 0;
let viewportHeight = 0;

const reportPageAccessDepth = () => {
  const now = performance.now();
  stagingReport("BasicBehavior", {
    mainType: 1,
    subType: 1004,
    ...getBasicParams(),
    startTime: now,
    value: toPercent((scrollTop + viewportHeight) / pageHeight),
  });
};

export default function pageAccessHeight() {
  window.addEventListener("scroll", onScroll);
  window.addEventListener("onbeforeunload", reportPageAccessDepth);
  // 页面加载完成后初始化记录当前访问高度、时间
  window.addEventListener("onload", () => {
    startTime = performance.now();
    pageHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    viewportHeight = window.innerHeight;
  });
}

function onScroll() {
  clearTimeout(timer);
  const now = performance.now();

  if (!hasReport) {
    hasReport = true;
    reportPageAccessDepth();
  }

  timer = setTimeout(() => {
    hasReport = false;
    startTime = now;
    pageHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    viewportHeight = window.innerHeight;
  }, 500);
}

function toPercent(val: number) {
  if (val >= 1) return 1;
  return val;
}
