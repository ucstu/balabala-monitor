import { ClickBehavior } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default () => {
  ["mousedown", "touchstart"].forEach((eventType) => {
    let timer: NodeJS.Timeout;
    window.addEventListener(eventType, (event) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const target = event.target as HTMLElement;
        const { top, left } = target?.getBoundingClientRect();

        stagingReport("ClickBehavior", {
          mainType: ClickBehavior.mainType.BasicBehavior,
          subType: ClickBehavior.subType.ClickBehavior,
          ...getBasicParams(),
          top,
          left,
          target: target?.tagName,
          startTime: event.timeStamp,
          html: document.documentElement.outerHTML,
          inner: target?.outerHTML,
        });
      }, 500);
    });
  });
};
