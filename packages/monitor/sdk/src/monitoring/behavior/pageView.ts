import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default function initPV() {
  stagingReport("BasicBehavior", {
    mainType: 1,
    subType: 1001,
    // referrer: document.referrer,   //跳转或者打开页面的URL
    ...getBasicParams(),
    value: Date.now(),
  });
}
