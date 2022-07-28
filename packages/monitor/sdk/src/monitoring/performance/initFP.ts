import { performanceObserver } from "@/common/observer";

export default function initFP(): void {
  performanceObserver.observe(
    { type: "navigation" },
    (entry: PerformanceEntry) => {
      console.log(entry);
    }
  );
}
