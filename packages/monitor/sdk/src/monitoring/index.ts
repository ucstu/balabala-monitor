import { monitoring } from "@/common/utils/functions";
import behavior from "./behavior";
import mistaken from "./mistaken";
import performance from "./performance";

export default () => {
  monitoring(performance, mistaken, behavior);
};
