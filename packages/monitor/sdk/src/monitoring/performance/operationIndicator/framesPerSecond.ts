import { getBasicParams } from "../../../common/utils";
import { reportWithCache } from "../../../reporting";

// @ts-ignore
const next = window.requestAnimationFrame
  ? requestAnimationFrame
  : (callback: () => void) => {
      setTimeout(callback, 1000 / 60);
    };

const frames: number[] = [];

export default function initFPS() {
  let frame = 0;
  let lastSecond = Date.now();

  function calculateFPS() {
    frame = 1;
    const now = Date.now();
    if (lastSecond + 300000 <= now) {
      // 由于 now - lastSecond 的单位是毫秒，所以 frame 要 * 1000
      const fps = Math.round((frame * 1000) / (now - lastSecond));
      frames.push(fps);

      frame = 0;
      lastSecond = now;
    }

    if ((frames.length = 60)) {
      reportWithCache("BasicIndicator", {
        value: frames[-1],
        mainType: 4,
        subType: 4001,
        ...getBasicParams(),
      });

      frames.length = 0;
    }

    next(calculateFPS);
  }

  calculateFPS();
}
