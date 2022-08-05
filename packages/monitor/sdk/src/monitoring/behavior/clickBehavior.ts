/**
 * @title ClickBehavior
 * @description Click Behavior, 用户点击
 */

import { getBasicParams } from "../../common/utils";
import { reportWithCache } from "../../reporting";

export default function clickBehavior() {
  ['mousedown', 'touchstart'].forEach(eventType => {
    let timer: number;
    window.addEventListener(eventType, event => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          const target = event.target
          const { top, left } = target?.getBoundingClientRect()

          reportWithCache('ClickBehavior', {
              ...getBasicParams(),
              top,
              left,
              eventType,
              pageHeight: document.documentElement.scrollHeight || document.body.scrollHeight,
              scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
              type: 'behavior',
              subType: 'click',
              target: target?.tagName,
              paths: event.path?.map(item => item.tagName).filter(Boolean),
              startTime: event.timeStamp,
              outerHTML: target?.outerHTML,
              innerHTML: target?.innerHTML,
          })
        }, 500)
    })
  })
}
