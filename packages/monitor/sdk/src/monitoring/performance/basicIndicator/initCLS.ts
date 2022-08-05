/**
 * @title initCLS
 * @description CLS(layout-shift)，从页面加载开始和其生命周期状态变为隐藏期间发生的所有意外布局偏移的累积分数。
 */

import { getBasicParams } from "../../../common/utils";
import { reportWithCache } from "../../../reporting";

interface PerformanceEntryCLS extends PerformanceEntry {
  hadRecentInput?: boolean,
  value?: number,
}


let sessionValue = 0
let sessionEntries: PerformanceEntryCLS[]
const cls = {
  mainType: 1,
  subType: 1004,
  value: 0,
  ...getBasicParams(),
}

export function entryHandler(entryList: PerformanceObserverEntryList) {
  entryList.getEntries().forEach((entry: PerformanceEntryCLS) => {
    // Only count layout shifts without recent user input.
    if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0] || {}
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1]

        // If the entry occurred less than 1 second after the previous entry and
        // less than 5 seconds after the first entry in the session, include the
        // entry in the current session. Otherwise, start a new session.
        if (
            sessionValue
            && entry.startTime - lastSessionEntry?.startTime < 1000
            && entry.startTime - firstSessionEntry?.startTime < 5000
        ) {
            sessionValue += entry.value || 0
            sessionEntries.push(entry)
        } else {
            sessionValue = entry.value || 0
            sessionEntries = [entry]
        }

        // If the current session value is larger than the current CLS value,
        // update CLS and the entries contributing to it.
        if (sessionValue > cls.value) {
            cls.value = sessionValue
            // cls.entries = sessionEntries
            cls.startTime = performance.now()
            reportWithCache('BasicIndicator', cls)
        }
    }
  });
}

const observer = new PerformanceObserver(entryHandler)
observer.observe({ type: 'layout-shift', buffered: true })
