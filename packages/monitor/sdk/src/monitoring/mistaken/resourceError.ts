import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";
import { ResourceError } from "@balabala/monitor-api";

export default () => {
  window.addEventListener(
    "error",
    (e: ErrorEvent) => {
      const target = e.target as
        | HTMLScriptElement
        | HTMLStyleElement
        | HTMLImageElement
        | HTMLAudioElement
        | HTMLVideoElement
        | any;
      if (!target) return;

      if (target.src || target.href) {
        const url = target.src || target.href;
        stagingReport("ResourceError", {
          mainType: ResourceError.mainType.ResourceError,
          subType: ResourceError.subType.ResourceError,
          ...getBasicParams(),
          errorTime: e.timeStamp,
          resourceType: target.tagName,
          html: document.documentElement.outerHTML,
          path: url,
        });
      }
    },
    true
  );
};
