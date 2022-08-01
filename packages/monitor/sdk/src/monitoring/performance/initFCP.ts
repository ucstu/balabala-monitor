import { getBasicParams } from "../../common/utils";
import { reportWithCache } from "../../reporting";

export default function initFCP(): void {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-contentful-paint") {
        observer.disconnect();
        reportWithCache("BasicIndicator", {
          mainType: 1,
          subType: 1002,
          value: entry.startTime,
          ...getBasicParams(),
        });
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "paint", buffered: true });
}
