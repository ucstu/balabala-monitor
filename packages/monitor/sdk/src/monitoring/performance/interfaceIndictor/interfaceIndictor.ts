import { BasicIndicator } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default () => {
  const originalProto = XMLHttpRequest.prototype;
  const originalOpen = originalProto.open;
  const originalSend = originalProto.send;

  originalProto.open = function newOpen(this: any, ...args: any) {
    this.url = args[1];
    this.method = args[0];
    originalOpen.apply(this, args);
  } as (method: string, url: string | URL) => void;

  originalProto.send = function newSend(this: any, ...args: any) {
    this.startTime = Date.now();

    const onLoadend = () => {
      this.endTime = Date.now();
      this.duration = this.endTime - this.startTime;

      stagingReport("InterfaceIndicator", {
        mainType: BasicIndicator.mainType.InterfaceIndicator,
        subType: BasicIndicator.subType.InterfaceIndicator,
        ...getBasicParams(),
        duration: this.duration,
        method: this.method,
        statusCode: this.status,
        url: this.url,
      });

      this.removeEventListener("loadend", onLoadend, true);
    };

    this.addEventListener("loadend", onLoadend, true);
    originalSend.apply(this, args);
  };

  const originalFetch = window.fetch;

  window.fetch = function newFetch(url, config) {
    const startTime = Date.now();
    const reportData = {
      startTime,
      endTime: 0,
      duration: 0,
      statusCode: 0,
      success: false,
      url: url.toString(),
      method: (config?.method || "GET").toUpperCase(),
    };

    return originalFetch(url, config)
      .then((res) => {
        reportData.endTime = Date.now();
        reportData.duration = reportData.endTime - reportData.startTime;

        const data = res.clone();
        reportData.statusCode = data.status;
        reportData.success = data.ok;

        stagingReport("InterfaceIndicator", {
          mainType: BasicIndicator.mainType.InterfaceIndicator,
          subType: BasicIndicator.subType.InterfaceIndicator,
          ...getBasicParams(),
          ...reportData,
        });

        return res;
      })
      .catch((err) => {
        reportData.endTime = Date.now();
        reportData.duration = reportData.endTime - reportData.startTime;
        reportData.statusCode = 0;
        reportData.success = false;

        stagingReport("InterfaceIndicator", {
          mainType: BasicIndicator.mainType.InterfaceIndicator,
          subType: BasicIndicator.subType.InterfaceIndicator,
          ...getBasicParams(),
          ...reportData,
        });

        throw err;
      });
  };
};
