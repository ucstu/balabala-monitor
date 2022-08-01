import { getBasicParams } from "../../common/utils";
import { reportWithCache } from "../../reporting";

export default function initLCP() {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    if (observer) {
      observer.disconnect();
    }

    for (const entry of list.getEntries()) {
      reportWithCache("BasicIndicator", {
        mainType: 1,
        subType: 1003,
        value: entry.startTime,
        ...getBasicParams(),
      });
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "largest-contentful-paint", buffered: true });
}
