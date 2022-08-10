import { BasicBehavior } from "@/common/utils/apis";
import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default () => {
  stagingReport("BasicBehavior", {
    mainType: BasicBehavior.mainType.BasicBehavior,
    subType: BasicBehavior.subType.PV,
    ...getBasicParams(),
    value: 1,
  });
};
