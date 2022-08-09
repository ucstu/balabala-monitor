import { BasicIndicator } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { onHidden } from "@/common/utils/events";
import { stagingReport } from "@/reporting";

interface PerformanceLayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export default () => {
  let cumulativeLayoutShiftScore = 0;

  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries = list.getEntries() as PerformanceLayoutShift[];
    for (const entry of entries) {
      if (!entry.hadRecentInput) {
        cumulativeLayoutShiftScore += entry.value;
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "layout-shift", buffered: true });

  // 只在页面退入后台时才上报
  const removeEventListener = onHidden(() => {
    observer.takeRecords();
    observer.disconnect();
    removeEventListener();
    stagingReport("BasicIndicator", {
      mainType: BasicIndicator.mainType.Performance,
      subType: BasicIndicator.subType.LayoutShift,
      ...getBasicParams(),
      value: cumulativeLayoutShiftScore,
    });
  });
};
