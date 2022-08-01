import initFCP from "./performance/initFCP";
import initFP from "./performance/initFP";
import initLCP from "./performance/initLCP";

export const initMonitoring = () => {
  initFP();
  initFCP();
  initLCP();
};
