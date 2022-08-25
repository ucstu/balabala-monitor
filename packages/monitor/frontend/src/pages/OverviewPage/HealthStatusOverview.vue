<template>
  <div class="main">
    <ToolBar v-model:dateTime="activeDateTime" title="健康数据" />
    <DataCard title="一天的用户访问量趋势">
      <div
        style="
          display: flex;
          justify-content: space-between;
          text-align: center;
        "
      >
        <div style="display: flex; align-items: center; width: 650px">
          <ECharts
            :option="interfaceErrorStatisticsChartOption"
            :autoresize="true"
            class="bar2"
          ></ECharts>
          <ECharts
            :option="resourse_options"
            :autoresize="true"
            class="bar2"
          ></ECharts>
        </div>
      </div>
    </DataCard>
    <div class="bar">
      <DataCard
        title="一天的JS错误趋势"
        style="margin-top: 20px"
        :loading="jsDataLoading"
        class="bar-box"
      >
        <ECharts
          :option="jsErrorOption"
          :autoresize="true"
          class="bar-echarts"
        />
      </DataCard>
      <DataCard
        title="一天的资源错误趋势"
        style="margin-top: 20px"
        :loading="resourceErrorDataLoading"
        class="bar-box"
      >
        <ECharts
          :option="resourceErrorOption"
          :autoresize="true"
          class="bar-echarts"
        />
      </DataCard>
      <DataCard
        title="一天的接口错误趋势"
        style="margin-top: 20px"
        :loading="interfaceErrorDataLoading"
        class="bar-box"
      >
        <ECharts
          :option="interfaceErrorOption"
          :autoresize="true"
          class="bar-echarts"
        />
      </DataCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  InterfaceIndicator,
  JavaScriptError,
  ResourceError,
  ResourceIndicator,
} from "@/apis";
import DataCard from "@/components/DataCard.vue";
import ToolBar from "@/components/ToolBar.vue";
import { basicChartOption } from "@/configs";
import {
  useInterfaceErrorStatistics,
  useJavaScriptErrorStatistics,
  useResourceErrorStatistics,
} from "@/hooks";
import { useResourceIndicatorStatistics } from "@/hooks/useResourceIndicatorStatistics";
import dayjs from "dayjs";
import { EChartsCoreOption } from "echarts";
import "vue-datepicker-next/index.css";
import ECharts from "vue-echarts";

// 日期
let activeDateTime = $ref(dayjs());

// 静态资源错误
const { resourceErrorStatistics } = $(
  useResourceErrorStatistics(() => {
    return {
      mainType: ResourceError.mainType.ResourceError,
      subType: ResourceError.subType.ResourceError,
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "day"),
      granularity: "1d",
    };
  })
);

// 静态资源错误率
const totalResourceError = $computed(
  () =>
    (resourceErrorStatistics?.reduce((sum, item) => (sum += item.count), 0) ||
      0) /
    (resourceIndicatorStatistics?.reduce(
      (sum, item) => (sum += item.count),
      0
    ) || 0)
);

// 静态资源请求
const { resourceIndicatorStatistics } = $(
  useResourceIndicatorStatistics(() => {
    return {
      mainType: ResourceIndicator.mainType.ResourceIndicator,
      subType: ResourceIndicator.subType.ResourceIndicator,
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "day"),
      granularity: "1d",
    };
  })
);
// 资源错误率option配置
const interfaceErrorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    series: [
      {
        type: "pie", //pie类型的图实现环形图
        radius: ["60%", "90%"], //数组的话，表示内圆和外圆的半径大小，相对于宽高中较小的那一个。
        center: ["50%", "50%"], //圆心坐标
        label: {
          //每个数据的标签
          show: true, //设置为true则显示第一个数据
          position: "center", //位置居中
          formatter: "{d}%", //{d}表示数据在总数据中的百分比
          fontSize: 20,
          fontWeight: "bold",
        },
        color: ["#1E3E55", "#dfe6e9"], //系列的颜色
        emphasis: {
          //高亮，即鼠标经过时的样式
          scale: false, //表示不放大item
        },
        labelLine: {
          show: true,
        },
        data: [
          {
            value:
              resourceErrorStatistics?.reduce(
                (sum, item) => (sum += item.count),
                0
              ) || 0,
            name: "错误请求",
            emphasis: {
              label: {
                show: false, //这个数据高亮时不显示label，就不会显示替遮住第一个数据的label值了
              },
            },
          },
          {
            value: resourceIndicatorStatistics?.reduce(
              (sum, item) => (sum += item.count),
              0
            ),
            name: "正确请求",
          },
        ],
      },
    ],
  };
});

const resourseStatistics = $ref<number>(0);
const resourseErrorStatistics = $ref<number>(0);

const resourse_options = $computed<EChartsCoreOption>(() => {
  return {
    title: {
      zlevel: 2, // 控制圆环图中间的字的层级
      text:
        (resourseErrorStatistics /
          (resourseStatistics + resourseErrorStatistics)) *
        100
          ? (
              (resourseErrorStatistics /
                (resourseStatistics + resourseErrorStatistics)) *
              100
            ).toFixed(2) + "%"
          : "暂无数据",
      top: "45%",
      left: "50%",
      textAlign: "center", // 让文字居中
      textStyle: {
        color: "red",
        fontWeight: "bolder",
        fontSize: "30px",
      },
    },
    series: [
      {
        name: "resourse",
        type: "pie",
        radius: ["60%", "80%"],
        avoidLabelOverlap: false,
        data: [
          {
            value: resourseStatistics + resourseErrorStatistics,
            name: "资源请求",
          },
          {
            value: resourseErrorStatistics,
            name: "资源错误",
          },
        ],
      },
    ],
    ...basicChartOption,
  };
});

// js 错误统计
const {
  javaScriptErrorStatistics: jsDataList,
  javaScriptErrorStatisticsLoading: jsDataLoading,
} = $(
  useJavaScriptErrorStatistics(() => {
    return {
      mainType: JavaScriptError.mainType.JavaScriptError,
      subType: JavaScriptError.subType.JavaScriptError,
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "day"),
      granularity: "4h",
    };
  })
);
// js 上一周错误统计
const {
  javaScriptErrorStatistics: jsLastWeekDataList,
  javaScriptErrorStatisticsLoading: jsLastWeekDataLoading,
} = $(
  useJavaScriptErrorStatistics(() => {
    return {
      mainType: JavaScriptError.mainType.JavaScriptError,
      subType: JavaScriptError.subType.JavaScriptError,
      startTime: activeDateTime.subtract(1, "week"),
      endTime: activeDateTime.subtract(1, "week").add(1, "day"),
      granularity: "4h",
    };
  })
);
// js图表的option
const jsErrorOption = $computed<EChartsCoreOption>(() => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: jsDataList?.map((item) => {
          return dayjs(item.dateTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
        }),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "上周错误",
        type: "line",
        stack: "lastWeekError",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: jsLastWeekDataList?.map((item) => {
          return item.count;
        }),
      },
      {
        name: "今日错误",
        type: "line",
        stack: "todyError",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: jsDataList?.map((item) => {
          return item.count;
        }),
      },
    ],
  };
});

// 资源错误统计
const {
  resourceErrorStatistics: resourceErrorDataList,
  resourceErrorStatisticsLoading: resourceErrorDataLoading,
} = $(
  useResourceErrorStatistics(() => {
    return {
      mainType: ResourceError.mainType.ResourceError,
      subType: ResourceError.subType.ResourceError,
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "day"),
      granularity: "4h",
    };
  })
);

// 资源错误 上一周统计
const {
  resourceErrorStatistics: resourceErrorLastWeekDataList,
  resourceErrorStatisticsLoading: resourceErrorLastWeekDataLoading,
} = $(
  useResourceErrorStatistics(() => {
    return {
      mainType: ResourceError.mainType.ResourceError,
      subType: ResourceError.subType.ResourceError,
      startTime: activeDateTime.subtract(1, "week"),
      endTime: activeDateTime.subtract(1, "week").add(1, "day"),
      granularity: "4h",
    };
  })
);
// 资源错误图表的option
const resourceErrorOption = $computed<EChartsCoreOption>(() => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: resourceErrorDataList?.map((item) => {
          return dayjs(item.dateTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
        }),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "上周错误",
        type: "line",
        stack: "lastWeekError",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: resourceErrorLastWeekDataList?.map((item) => {
          return item.count;
        }),
      },
      {
        name: "今日错误",
        type: "line",
        stack: "todyError",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: resourceErrorDataList?.map((item) => {
          return item.count;
        }),
      },
    ],
  };
});

// 接口错误统计
const {
  interfaceErrorStatistics: interfaceErrorDataList,
  interfaceErrorStatisticsLoading: interfaceErrorDataLoading,
} = $(
  useInterfaceErrorStatistics(() => {
    return {
      mainType: InterfaceIndicator.mainType.InterfaceIndicator,
      subType: InterfaceIndicator.subType.InterfaceIndicator,
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "day"),
      granularity: "4h",
    };
  })
);

// 接口错误 上一周统计
const { interfaceErrorStatistics: interfaceErrorLastWeekDataList } = $(
  useInterfaceErrorStatistics(() => {
    return {
      mainType: InterfaceIndicator.mainType.InterfaceIndicator,
      subType: InterfaceIndicator.subType.InterfaceIndicator,
      startTime: activeDateTime.subtract(1, "week"),
      endTime: activeDateTime.subtract(1, "week").add(1, "day"),
      granularity: "4h",
    };
  })
);
// 接口错误图表的option
const interfaceErrorOption = $computed<EChartsCoreOption>(() => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: interfaceErrorDataList?.map((item) => {
          return dayjs(item.dateTime, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
        }),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "上周错误",
        type: "line",
        stack: "lastWeekError",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: interfaceErrorLastWeekDataList?.map((item) => {
          return item.count;
        }),
      },
      {
        name: "今日错误",
        type: "line",
        stack: "todyError",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: interfaceErrorDataList?.map((item) => {
          return item.count;
        }),
      },
    ],
  };
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  padding: 5px 35px 0 25px;
  background-color: rgb(240 240 240 / 30%);

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .title {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
    }

    .calendar {
      padding: 5px 0;
    }

    .calendar input {
      width: 130px;
      height: 26px;
      border: none;
      outline: none;
    }
  }

  .bar1 {
    display: flex;
    width: 300px;
    height: 350px;
    text-align: center;
  }

  .bar2 {
    width: 250px;
    height: 300px;
  }

  .bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .bar-box {
      margin: 0 20px;
    }

    .bar-echarts {
      width: 450px;
      height: 300px;
    }
  }
}
</style>
