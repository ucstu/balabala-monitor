type PerformanceEntryHandler = (entry: PerformanceEntry) => void;

const performanceEntryHandlersMap: Map<
  string,
  Array<PerformanceEntryHandler>
> = new Map();

const performanceObserverEntryHandler = (
  list: PerformanceObserverEntryList
) => {
  for (const entry of list.getEntries()) {
    performanceEntryHandlersMap
      .get(entry.name)
      ?.forEach((handler) => handler(entry));
  }
};

const _performanceObserver = new PerformanceObserver(
  performanceObserverEntryHandler
);

export const performanceObserver:
  | PerformanceObserver
  | {
      observe: (
        options: PerformanceObserverInit,
        handler: PerformanceEntryHandler
      ) => void;
    } = {
  ..._performanceObserver,
  observe: (
    options: PerformanceObserverInit,
    handler: PerformanceEntryHandler
  ) => {
    if (options.type !== undefined) {
      if (!performanceEntryHandlersMap.has(options.type)) {
        performanceEntryHandlersMap.set(options.type, [handler]);
      } else {
        performanceEntryHandlersMap.get(options.type)?.push(handler);
      }
    }
    _performanceObserver.observe(options);
  },
};
