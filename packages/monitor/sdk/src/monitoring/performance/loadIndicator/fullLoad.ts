import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default function initLoad() {
  ["load", "DOMContentLoaded"].forEach((type) => onEvent(type));

  function onEvent(type: string) {
    function callback() {
      stagingReport("BasicIndicator", {
        mainType: 2,
        subType: type === "load" ? 2002 : 2001,
        ...getBasicParams(),
        value: performance.now(),
      });

      window.removeEventListener(type, callback, true);
    }

    window.addEventListener(type, callback, true);
  }
}
