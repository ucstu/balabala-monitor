import { BasicIndicator } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export let isLCPDone = false;
export default () => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries = list.getEntries() as PerformancePaintTiming[];
    for (const entry of entries) {
      if (entry.name === "") {
        observer.disconnect();
        stagingReport("BasicIndicator", {
          mainType: BasicIndicator.mainType.Performance,
          subType: BasicIndicator.subType.LargestContentfulPaint,
          ...getBasicParams(),
          value: entry.startTime,
        });
        isLCPDone = true;
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "largest-contentful-paint", buffered: true });
};
