import initPageSkipBehavior from "./behavior/initPageSkipBehavior";
import initPV from "./behavior/initPV";
import initFCP from "./performance/basicIndicator/initFCP";
import initFP from "./performance/basicIndicator/initFP";
import initLCP from "./performance/basicIndicator/initLCP";
import initFirstScreenLoad from "./performance/initFirstScreenLoad";
import initFPS from "./performance/initFramesPerSecond";
import initLoad from "./performance/initLoad";

export const initMonitoring = () => {
  initFP();
  initFCP();
  initLCP();
  initLoad();
  initFPS();
  initPV();
  initFirstScreenLoad();
  initPageSkipBehavior();
};
