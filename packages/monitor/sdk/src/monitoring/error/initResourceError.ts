import { getBasicParams } from "src/common/utils";
import { reportWithCache } from "src/reporting";

export default function initResourceError(): void {
  window.addEventListener(
    "error",
    (e: EventTarget | any) => {
      const target: EventTarget | any = e.target;
      if (!target) return;

      if (target.src || target.href) {
        const url = target.src || target.href;
        reportWithCache("ResourceError", {
          mainType: 1,
          subType: 1001,
          errorTime: e.timeStamp,
          resourceType: target.tagName,
          html: target.outerHTML,
          path: e.path
            .map((item: { tagName: any }) => item.tagName)
            .filter(Boolean),
          // pageUrl:url,
          ...getBasicParams(),
        });
      }
    },
    true
  );
}
