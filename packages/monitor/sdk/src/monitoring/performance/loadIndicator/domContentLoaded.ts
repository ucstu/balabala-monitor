import { BasicIndicator } from "@/common/utils/apis";
import { getBasicParams, getPageUrl } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export let isDomContentLoaded = false;
export default () => {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries = list.getEntries() as PerformanceNavigationTiming[];
    for (const entry of entries) {
      if (entry.name === getPageUrl()) {
        observer.disconnect();
        stagingReport("BasicIndicator", {
          mainType: BasicIndicator.mainType.LoadIndicator,
          subType: BasicIndicator.subType.DOMContentLoaded,
          ...getBasicParams(),
          value: entry.domContentLoadedEventStart,
        });
        isDomContentLoaded = true;
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "navigation", buffered: true });
};
