declare type PerformanceEntryHandler = (
  entry: PerformanceEntry,
  stop?: () => void
) => void;
export declare const observerPerformance: (
  init: PerformanceObserverInit,
  handler: PerformanceEntryHandler
) => void;
export {};
