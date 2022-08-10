import { BasicBehavior } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { onBeforeUnload } from "@/common/utils/events";
import { realTimeReport } from "@/reporting";
import { loadedTime } from "../performance/loadIndicator/load";

export default () => {
  onBeforeUnload(() => {
    const now = performance.now();
    realTimeReport("BasicBehavior", [
      {
        mainType: BasicBehavior.mainType.BasicBehavior,
        subType: BasicBehavior.subType.PageDwellTime,
        ...getBasicParams(),
        value: now - loadedTime,
      },
    ]);
  });
};
