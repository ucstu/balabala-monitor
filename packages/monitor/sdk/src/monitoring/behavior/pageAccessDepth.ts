import { BasicBehavior } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { onBeforeUnload } from "@/common/utils/events";
import { realTimeReport } from "@/reporting";

export default () => {
  onBeforeUnload(() => {
    realTimeReport("BasicBehavior", [
      {
        mainType: BasicBehavior.mainType.BasicBehavior,
        subType: BasicBehavior.subType.PageAccessDepth,
        ...getBasicParams(),
        value:
          ((document.documentElement.scrollTop +
            document.documentElement.clientHeight) /
            document.documentElement.scrollHeight) %
          1,
      },
    ]);
  });
};
