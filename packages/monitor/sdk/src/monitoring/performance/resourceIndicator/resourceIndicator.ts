import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default function resourceIndicator(): void {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    for (const entry of list.getEntries() as PerformanceResourceTiming[]) {
      if (entry.initiatorType !== "xmlhttprequest") {
        stagingReport("ResourceIndicator", {
          mainType: 1,
          subType: 1001,
          ...getBasicParams(),
          duration: entry.duration, // 资源加载耗时
          dns: entry.domainLookupEnd - entry.domainLookupStart, // DNS 耗时
          tcp: entry.connectEnd - entry.connectStart, // 建立 tcp 连接耗时
          redirect: entry.redirectEnd - entry.redirectStart, // 重定向耗时
          ttfb: entry.responseStart, // 首字节时间
          protocol: entry.nextHopProtocol, // 请求协议
          resourceSize: entry.decodedBodySize, // 资源解压后的大小
          isCache:
            entry.transferSize === 0 ||
            (entry.transferSize !== 0 && entry.encodedBodySize === 0), // 是否命中缓存
          startTime: performance.now(),
          bodySize: entry.transferSize, // 资源大小
          headerSize: entry.transferSize - entry.encodedBodySize, // 资源头部大小
        });
      }
    }
  };

  const observer = new PerformanceObserver(entryHandler);
  // buffered 属性表示是否观察缓存数据，也就是说观察代码添加时机比事情触发时机晚也没关系。
  observer.observe({ type: "resource", buffered: true });
}
