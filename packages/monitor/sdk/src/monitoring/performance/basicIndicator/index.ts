import { monitoring } from "@/common/utils/functions";
import contentLayoutShift from "./contentLayoutShift";
import firstContentfulPaint from "./firstContentfulPaint";
import firstPaint from "./firstPaint";
import largestContentfulPaint from "./largestContentfulPaint";

export default () => {
  monitoring(
    firstContentfulPaint,
    firstPaint,
    largestContentfulPaint,
    contentLayoutShift
  );
};
