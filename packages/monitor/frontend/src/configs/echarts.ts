import { EChartsCoreOption } from "echarts";

export const basicChartOption: EChartsCoreOption = {
  tooltip: {
    trigger: "item",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
};
