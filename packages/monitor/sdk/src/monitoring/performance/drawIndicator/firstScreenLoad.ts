import { BasicIndicator } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";
import { isLCPDone } from "../basicIndicator/largestContentfulPaint";
import { isLoaded } from "../loadIndicator/load";

type Entry = {
  startTime: Number;
  children: Node[];
};

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

let entries: Entry[] = [];

const isInScreen = (node: Node): Boolean => {
  const rectInfo = (node as HTMLElement).getBoundingClientRect();
  return rectInfo.left < viewportWidth && rectInfo.top < viewportHeight;
};

const needToCalculate = (node: any): Boolean => {
  if (window.getComputedStyle(node).display === "none") return false;
  if (node.tagName === "IMG" && node.width < 2 && node.height < 2) {
    return false;
  }
  return true;
};

const isInclude = (node: any, arr: any[]): Boolean => {
  if (!node || node === document.documentElement) {
    return false;
  }
  if (arr.includes(node)) {
    return true;
  }
  return isInclude(node.parentElement, arr);
};

const getRenderTime = (): Number => {
  let startTime = 0;
  entries.forEach((entry) => {
    for (const node of entry.children) {
      if (
        isInScreen(node) &&
        entry.startTime > startTime &&
        needToCalculate(node)
      ) {
        startTime = entry.startTime.valueOf();
        break;
      }
    }
  });

  // 需要和当前页面所有加载图片的时间做对比，取最大值
  // 图片请求时间要小于 startTime，响应结束时间要大于 startTime
  (
    performance.getEntriesByType("resource") as PerformanceResourceTiming[]
  ).forEach((item) => {
    if (
      item.initiatorType === "img" &&
      item.fetchStart < startTime &&
      item.responseEnd > startTime
    ) {
      startTime = item.responseEnd;
    }
  });

  return startTime;
};

let timer: NodeJS.Timeout;
const checkDOMChange = (observer: MutationObserver) => {
  clearInterval(timer);
  timer = setInterval(() => {
    // 等 load、lcp 事件触发后并且 DOM 树不再变化时，计算首屏渲染时间
    if (isLoaded && isLCPDone) {
      if (observer) {
        observer.disconnect();
      }
      stagingReport("BasicIndicator", {
        mainType: BasicIndicator.mainType.DrawIndicator,
        subType: BasicIndicator.subType.FirstScreenLoad,
        ...getBasicParams(),
        value: getRenderTime().valueOf(),
      });
      clearInterval(timer);
      entries = [];
    }
  }, 500);
};

export default () => {
  const ignoreDOMList = ["STYLE", "SCRIPT", "LINK", "META"];
  const entryHandler = (mutationList: MutationRecord[]) => {
    checkDOMChange(observer);

    let entry: Entry = {
      startTime: 0,
      children: [],
    };

    requestAnimationFrame(() => {
      entry.startTime = performance.now();
    });
    for (const mutation of mutationList) {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType === 1 &&
            !ignoreDOMList.includes((node as HTMLElement).tagName) &&
            !isInclude(node, entry.children)
          ) {
            entry.children.push(node);
          }
        });
      }
    }

    if (entry.children.length) {
      entries.push(entry);
    }
  };

  const observer = new MutationObserver(entryHandler);
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};
