import { getBasicParams, getPageUrl } from "../../common/utils";
import { reportWithCache } from "../../reporting";

export default function initPageSkipBehavior() {
  let from = "";
  window.addEventListener(
    "popstate",
    () => {
      const to = getPageUrl();

      reportWithCache("PageSkipBehavior", {
        from: from,
        to: to,
        mainType: 3,
        subType: 3001,
        ...getBasicParams(),
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

      reportWithCache("PageSkipBehavior", {
        from: oldURL,
        to: newURL,
        mainType: 3,
        subType: 3001,
        ...getBasicParams(),
      });

      oldURL = newURL;
    },
    true
  );
}
