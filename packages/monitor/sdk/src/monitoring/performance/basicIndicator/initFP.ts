import { getBasicParams } from "../../../common/utils";
import { reportWithCache } from "../../../reporting";

export default function initFP(): void {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-paint") {
        observer.disconnect();
        reportWithCache("BasicIndicator", {
          mainType: 1,
          subType: 1001,
          value: entry.startTime,
          ...getBasicParams(),
        });
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  // buffered 属性表示是否观察缓存数据，也就是说观察代码添加时机比事情触发时机晚也没关系。
  observer.observe({ type: "paint", buffered: true });
}
