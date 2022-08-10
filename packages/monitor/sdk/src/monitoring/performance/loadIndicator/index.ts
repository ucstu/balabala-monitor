import { monitoring } from "@/common/utils/functions";
import domContentLoaded from "./domContentLoaded";
import load from "./load";

export default () => {
  monitoring(domContentLoaded, load);
};
