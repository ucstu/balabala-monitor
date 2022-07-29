type PerformanceEntryHandler = (
  entry: PerformanceEntry,
  stop?: () => void
) => void;

const performanceEntryHandlers: Map<
  string,
  Array<PerformanceEntryHandler>
> = new Map();

const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    performanceEntryHandlers.get(entry.entryType)?.forEach((handler, index) => {
      handler(entry, () => {
        performanceEntryHandlers.get(entry.entryType)?.splice(index, 1);
      });
    });
  });
});

export const observerPerformance = (
  init: PerformanceObserverInit,
  handler: PerformanceEntryHandler
) => {
  init.type && performanceObserver.observe(init);
  init.type && performanceEntryHandlers.get(init.type)?.push(handler);
};
