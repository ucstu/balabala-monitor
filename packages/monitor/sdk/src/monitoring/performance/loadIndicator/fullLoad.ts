import { getBasicParams } from "../../../common/utils";
import { reportWithCache } from "../../../reporting";

export default function initLoad() {
  ["load", "DOMContentLoaded"].forEach((type) => onEvent(type));

  function onEvent(type: string) {
    function callback() {
      reportWithCache("BasicIndicator", {
        mainType: 2,
        subType: type === "load" ? 2002 : 2001,
        value: performance.now(),
        ...getBasicParams(),
      });

      window.removeEventListener(type, callback, true);
    }

    window.addEventListener(type, callback, true);
  }
}
