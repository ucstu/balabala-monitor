import { getBasicParams, getPageUrl } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

export default function initPageSkipBehavior() {
  let from = "";
  window.addEventListener(
    "popstate",
    () => {
      const to = getPageUrl();

      stagingReport("PageSkipBehavior", {
        mainType: 3,
        subType: 3001,
        ...getBasicParams(),
        from: from,
        to: to,
      });
      from = to;
    },
    true
  );

  let oldURL = "";
  window.addEventListener(
    "hashchange",
    (event) => {
      const newURL = event.newURL;

      stagingReport("PageSkipBehavior", {
        mainType: 3,
        subType: 3001,
        ...getBasicParams(),
        from: oldURL,
        to: newURL,
      });

      oldURL = newURL;
    },
    true
  );
}
