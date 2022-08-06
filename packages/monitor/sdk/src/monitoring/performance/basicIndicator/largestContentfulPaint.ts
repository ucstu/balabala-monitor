import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default function largestContentfulPaint(): void {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    if (observer) {
      observer.disconnect();
    }

    for (const entry of list.getEntries()) {
      stagingReport("BasicIndicator", {
        mainType: 1,
        subType: 1003,
        ...getBasicParams(),
        value: entry.startTime,
      });
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "largest-contentful-paint", buffered: true });
}
