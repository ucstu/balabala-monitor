import { getBasicParams } from "../../common/utils";
import { reportWithCache } from "../../reporting";

export default function initPV() {
  reportWithCache("BasicBehavior", {
    mainType: 1,
    subType: 1001,
    // referrer: document.referrer,   //跳转或者打开页面的URL
    value: Date.now(),
    ...getBasicParams(),
  });
}
