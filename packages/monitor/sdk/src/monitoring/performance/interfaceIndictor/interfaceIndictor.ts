import { getBasicParams } from "../../../common/utils";
import { reportWithCache } from "../../../reporting";

export default function interfaceIndicator(): void {
  const originalProto = XMLHttpRequest.prototype;
  const originalOpen = originalProto.open;
  const originalSend = originalProto.send;

  originalProto.open = function newOpen(this: any, ...args: any) {
    this.url = args[1];
    this.method = args[0];
    originalOpen.apply(this, args);
  } as any;

  originalProto.send = function newSend(this: any, ...args: any) {
    this.startTime = Date.now();

    const onLoadend = () => {
      this.endTime = Date.now();
      this.duration = this.endTime - this.startTime;

      const {
        status: statusCode,
        duration,
        startTime,
        endTime,
        url,
        method,
      } = this;

      reportWithCache("InterfaceIndicator", {
        mainType: 4,
        subType: 4001,
        ...getBasicParams(),
        duration,
        method,
        statusCode,
        url,
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

        reportWithCache("InterfaceIndicator", {
          mainType: 4,
          subType: 4001,
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

        reportWithCache("InterfaceIndicator", {
          mainType: 4,
          subType: 4001,
          ...getBasicParams(),
          ...reportData,
        });

        throw err;
      });
  };
}
