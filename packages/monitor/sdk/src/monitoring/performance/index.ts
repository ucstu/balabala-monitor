import { monitoring } from "@/common/utils/functions";
import basicIndicator from "./basicIndicator";
import drawIndicator from "./drawIndicator";
import interfaceIndictor from "./interfaceIndictor";
import loadIndicator from "./loadIndicator";
// import operationIndicator from "./operationIndicator";
import resourceIndicator from "./resourceIndicator";

export default () => {
  monitoring(
    basicIndicator,
    drawIndicator,
    interfaceIndictor,
    loadIndicator,
    // operationIndicator,
    resourceIndicator
  );
};
