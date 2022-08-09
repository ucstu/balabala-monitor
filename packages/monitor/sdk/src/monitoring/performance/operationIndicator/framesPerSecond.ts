import { getBasicParams } from "@/common/utils/datas";
import { stagingReport } from "@/reporting";

let frame = 0;
let lastSecond = performance.now();
const calculateFPS = () => {
  frame++;
  const now = performance.now();
  if (lastSecond + 1000 <= now) {
    // 由于 now - lastSecond 的单位是毫秒，所以 frame 要 * 1000
    stagingReport("BasicIndicator", {
      mainType: 4,
      subType: 4001,
      ...getBasicParams(),
      value: Math.round((frame * 1000) / (now - lastSecond)),
    });
    frame = 0;
    lastSecond = now;
  }
  requestAnimationFrame(calculateFPS);
};

export default calculateFPS;
