import { getBasicParams, getPageUrl } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";
import { PageSkipBehavior } from "@balabala/monitor-api";

export default function initPageSkipBehavior() {
  let from1 = "";
  window.addEventListener(
    "popstate",
    () => {
      const to1 = getPageUrl();
      stagingReport("PageSkipBehavior", {
        mainType: PageSkipBehavior.mainType.PageSkipBehavior,
        subType: PageSkipBehavior.subType.PageSkipBehavior,
        ...getBasicParams(),
        from: from1,
        to: to1,
      });
      from1 = to1;
    },
    true
  );

  let from2 = "";
  window.addEventListener(
    "hashchange",
    (event) => {
      const to2 = event.newURL;
      stagingReport("PageSkipBehavior", {
        mainType: PageSkipBehavior.mainType.PageSkipBehavior,
        subType: PageSkipBehavior.subType.PageSkipBehavior,
        ...getBasicParams(),
        from: from2,
        to: to2,
      });
      from2 = to2;
    },
    true
  );
}
