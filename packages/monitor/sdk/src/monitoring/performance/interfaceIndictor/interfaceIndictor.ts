import { BasicIndicator } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

type SuperXMLHttpRequest = XMLHttpRequest & {
  openData: {
    method: string;
    url: string | URL;
    async?: boolean;
    username?: string | null | undefined;
    password?: string | null | undefined;
  };
};

export default () => {
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (
    this: SuperXMLHttpRequest,
    method: string,
    url: string | URL,
    async?: boolean,
    username?: string | null | undefined,
    password?: string | null | undefined
  ) {
    this.openData = {
      method,
      url,
      async,
      username,
      password,
    };
    originalOpen.call(this, method, url, async!, username, password);
  };

  XMLHttpRequest.prototype.send = function (
    this: SuperXMLHttpRequest,
    body?: Document | XMLHttpRequestBodyInit | null | undefined
  ) {
    const start = Date.now();

    const handler = (event: ProgressEvent) => {
      const duration = Date.now() - start;
      console.log(this, event);
      stagingReport("InterfaceIndicator", {
        mainType: BasicIndicator.mainType.InterfaceIndicator,
        subType: BasicIndicator.subType.InterfaceIndicator,
        ...getBasicParams(),
        duration,
        method: this.openData.method,
        statusCode: this.status,
        url: this.openData.url.toString(),
      });
      this.removeEventListener("load", handler, true);
      this.removeEventListener("error", handler, true);
      this.removeEventListener("abort", handler, true);
    };
    this.addEventListener("load", handler, true);
    this.addEventListener("error", handler, true);
    this.addEventListener("abort", handler, true);
    originalSend.call(this, body);
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
