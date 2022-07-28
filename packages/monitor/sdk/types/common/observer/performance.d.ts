declare type PerformanceEntryHandler = (entry: PerformanceEntry) => void;
export declare const performanceObserver:
  | PerformanceObserver
  | {
      observe: (
        options: PerformanceObserverInit,
        handler: PerformanceEntryHandler
      ) => void;
    };
export {};
