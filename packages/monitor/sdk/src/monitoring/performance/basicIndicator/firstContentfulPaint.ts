import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";
import { BasicIndicator } from "@balabala/monitor-api";

export default function firstContentfulPaint(): void {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-contentful-paint") {
        observer.disconnect();
        stagingReport("BasicIndicator", {
          mainType: BasicIndicator.mainType._1,
          subType: BasicIndicator.subType._1001,
          ...getBasicParams(),
          value: entry.startTime,
        });
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "paint", buffered: true });
}
