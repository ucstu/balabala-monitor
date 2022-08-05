import { getBasicParams } from "../../../common/utils";
import { reportWithCache } from "../../../reporting";

let isOnLoaded = false;
executeAfterLoad(() => {
  isOnLoaded = true;
});

let timer: NodeJS.Timeout;
let observer: MutationObserver;
let entries: any[] = [];
function checkDOMChange() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // 等 load、lcp 事件触发后并且 DOM 树不再变化时，计算首屏渲染时间
    if (isOnLoaded && isLCPDone()) {
      observer && observer.disconnect();
      reportWithCache("BasicIndicator", {
        mainType: 3,
        subType: 3001,
        value: getRenderTime(),
        ...getBasicParams(),
      });

      entries = [];
    } else {
      checkDOMChange();
    }
  }, 500);
}

export default function initFirstScreenLoad() {
  if (!MutationObserver) return;

  // @ts-ignore
  const next = window.requestAnimationFrame
    ? requestAnimationFrame
    : setTimeout;
  const ignoreDOMList = ["STYLE", "SCRIPT", "LINK", "META"];
  observer = new MutationObserver((mutationList) => {
    checkDOMChange();

    let entry: {
      startTime: number;
      children: any[];
    };
    entry = {
      startTime: 0,
      children: [],
    };

    next(() => {
      entry.startTime = performance.now();
    });
    let node: any;
    for (const mutation of mutationList) {
      if (mutation.addedNodes.length) {
        for (node of Array.from(mutation.addedNodes)) {
          if (
            node.nodeType === 1 &&
            !ignoreDOMList.includes(node.tagName) &&
            !isInclude(node, entry.children)
          ) {
            entry.children.push(node);
          }
        }
      }
    }

    if (entry.children.length) {
      entries.push(entry);
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

function getRenderTime() {
  let startTime = 0;
  entries.forEach((entry) => {
    for (const node of entry.children) {
      if (
        isInScreen(node) &&
        entry.startTime > startTime &&
        needToCalculate(node)
      ) {
        startTime = entry.startTime;
        break;
      }
    }
  });

  // 需要和当前页面所有加载图片的时间做对比，取最大值
  // 图片请求时间要小于 startTime，响应结束时间要大于 startTime
  performance.getEntriesByType("resource").forEach((item: any) => {
    if (
      item.initiatorType === "img" && //发起人类型
      item.fetchStart < startTime && //资源开始时间
      item.responseEnd > startTime //响应结束时间
    ) {
      startTime = item.responseEnd;
    }
  });

  return startTime;
}

function needToCalculate(node: any) {
  // 隐藏的元素不用计算
  if (window.getComputedStyle(node).display === "none") return false;

  // 用于统计的图片不用计算
  if (node.tagName === "IMG" && node.width < 2 && node.height < 2) {
    return false;
  }

  return true;
}

function isInclude(node: any, arr: any[]): any {
  if (!node || node === document.documentElement) {
    return false;
  }

  if (arr.includes(node)) {
    return true;
  }

  return isInclude(node.parentElement, arr);
}

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// dom 对象是否在屏幕内
function isInScreen(dom: Element) {
  const rectInfo = dom.getBoundingClientRect();
  if (
    rectInfo.left >= 0 &&
    rectInfo.left < viewportWidth &&
    rectInfo.top >= 0 &&
    rectInfo.top < viewportHeight
  ) {
    return true;
  }
}
function executeAfterLoad(callback: { (): void; (): void }) {
  if (document.readyState === "complete") {
    callback();
  } else {
    const onLoad = () => {
      callback();
      window.removeEventListener("load", onLoad, true);
    };

    window.addEventListener("load", onLoad, true);
  }
}

let lcpDone = false;
function isLCPDone() {
  return lcpDone;
}
