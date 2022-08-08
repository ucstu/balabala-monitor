import { monitoring } from "@/common/utils/functions";
import clickBehavior from "./clickBehavior";
import pageAccessDepth from "./pageAccessDepth";
import pageDwellTime from "./pageDwellTime";
import pageSkipBehavior from "./pageSkipBehavior";
import pageView from "./pageView";

export default () => {
  monitoring(
    clickBehavior,
    pageAccessDepth,
    pageDwellTime,
    pageSkipBehavior,
    pageView
  );
};
