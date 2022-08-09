import { BasicIndicator } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default () => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries = list.getEntries() as PerformancePaintTiming[];
    for (const entry of entries) {
      if (entry.name === "first-contentful-paint") {
        observer.disconnect();
        stagingReport("BasicIndicator", {
          mainType: BasicIndicator.mainType.Performance,
          subType: BasicIndicator.subType.FirstContentfulPaint,
          ...getBasicParams(),
          value: entry.startTime,
        });
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "paint", buffered: true });
};
