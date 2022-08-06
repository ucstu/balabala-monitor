/**
 * @title ClickBehavior
 * @description Click Behavior, 用户点击
 */

import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";
import { ClickBehavior } from "@balabala/monitor-api";

export default () => {
  ["mousedown", "touchstart"].forEach((eventType) => {
    let timer: NodeJS.Timeout;
    window.addEventListener(eventType, (event) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const target = event.target as HTMLElement;
        const { top, left } = target?.getBoundingClientRect();

        stagingReport("ClickBehavior", {
          mainType: ClickBehavior.mainType._1,
          subType: ClickBehavior.subType._1001,
          ...getBasicParams(),
          top,
          left,
          target: target?.tagName,
          startTime: event.timeStamp,
          html: target?.outerHTML,
          inner: target?.innerHTML,
        });
      }, 500);
    });
  });
};
