import { observerPerformance } from "@/common/observer";

export default function initFCP(): void {
  observerPerformance({ type: "paint" }, (entry: PerformanceEntry) => {
    if (entry.name === "first-contentful-paint") {
      console.log(entry);
    }
  });
}
