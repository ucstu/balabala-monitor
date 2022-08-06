import { monitoring } from "@/common/utils/functions";
import javaScriptError from "./javaScriptError";
import promiseError from "./promiseError";
import resourceError from "./resourceError";

export default () => {
  monitoring(javaScriptError, promiseError, resourceError);
};
