<template>
  <div class="bg">
    <header class="header">
      <div class="title">页面性能</div>
      <div class="calendar">
        <!-- <input type="text" placeholder="今天" /><i class="fa fa-calendar-o"></i> -->
        <DatePicker
          v-model:value="performanceRawTime"
          format="YYYY-MM-DD"
          style="width: 150px"
          value-type="format"
          :disabled-date="disabledDateHandler"
          :editable="false"
          :clearable="false"
        />
      </div>
    </header>
    <div class="board">
      <div class="data-board">
        <span>FCP平均时间</span>
        <span>{{ fcp.toFixed(2) }}ms</span>
      </div>
      <div class="data-board">
        <span>DOM解析时间</span>
        <span>{{ dcl.toFixed(2) }}ms</span>
      </div>
      <div class="data-board">
        <span>页面平均加载时间</span>
        <span>{{ fl.toFixed(2) }}ms</span>
      </div>
    </div>
    <div class="page-body">
      <div class="page-body-left">
        <DataCard
          title="页面加载耗时分段数量占比"
          :loading="pagePerformanceLoading"
        >
          <div class="page-body-echarts">
            <ECharts :option="pagePerformanceOption" :autoresize="true" />
          </div>
        </DataCard>
      </div>
      <div class="page-body-right">
        <DataCard
          title="页面加载耗时路由Top10"
          :loading="pagePerformanceDataListLoading"
        >
          <div class="list">
            <div class="list-item">
              <div class="list-left">页面路由</div>
              <div class="list-right">
                <div class="list-right-item">数量</div>
                <div class="list-right-item">平均耗时</div>
              </div>
            </div>
            <div
              v-for="(item, index) in pagePerformanceDataList"
              :key="index"
              class="list-item"
            >
              <div class="list-left">{{ item.pageUrl }}</div>
              <div class="list-right">
                <div class="list-right-item">{{ totalCount(item.count) }}</div>
                <div class="list-right-item">{{ totalTime(item.average) }}</div>
              </div>
            </div>
          </div>
        </DataCard>
      </div>
    </div>

    <header class="header">
      <div class="title">接口性能</div>
    </header>
    <div class="board">
      <div class="data-board">
        <span>接口请求总量</span>
        <span>{{ totalSumIndicator }}</span>
      </div>
      <div class="data-board">
        <span>接口请求平均耗时</span>
        <span>{{ totalAverageIndicator }}ms</span>
      </div>
      <div class="data-board">
        <span>接口请求成功率</span>
        <span
          >{{
            (
              (((totalSumIndicator || 0) - (errorIndicator || 0) || 0) /
                (totalSumIndicator || 0)) *
              100
            ).toFixed(2)
          }}%</span
        >
      </div>
    </div>
    <div class="page-body">
      <div class="page-body-left">
        <DataCard
          title="接口请求耗时分段数量占比"
          :loading="indicatorStatisticsLoading"
        >
          <div class="page-body-echarts">
            <ECharts :option="indicatorsPerformanceOption" :autoresize="true" />
          </div>
        </DataCard>
      </div>
      <div class="page-body-right">
        <DataCard
          title="接口请求耗时Top10"
          :loading="indicatorStatisticsDataListLoading"
        >
          <div class="list">
            <div class="list-item">
              <div class="list-left">页面路由</div>
              <div class="list-right">
                <div class="list-right-item">数量</div>
                <div class="list-right-item">平均耗时</div>
              </div>
            </div>
            <div
              v-for="(item, index) in indicatorStatisticsDataList"
              :key="index"
              class="list-item"
            >
              <div class="list-left">{{ item.url }}</div>
              <div class="list-right">
                <div class="list-right-item">{{ totalCount(item.count) }}</div>
                <div class="list-right-item">{{ totalTime(item.average) }}</div>
              </div>
            </div>
          </div>
        </DataCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataCard from "@/components/DataCard.vue";
import { useBasicIndicators } from "@/hooks/useBasicIndicators";
import { useBasicIndicatorStatistics } from "@/hooks/useBasicIndicatorStatistics";
import { useInterfaceErrorStatistics } from "@/hooks/useInterfaceErrorStatistics";
import { useInterfaceIndicators } from "@/hooks/useInterfaceIndicators";
import { useInterfaceIndicatorStatistics } from "@/hooks/useInterfaceIndicatorStatistics";
import { BasicIndicator } from "@balabala/monitor-api";
import dayjs from "dayjs";
import type { EChartsCoreOption } from "echarts";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import ECharts from "vue-echarts";
let performanceTime = $ref(dayjs());

const performanceRawTime = $computed<string>({
  get: () => performanceTime.format("YYYY-MM-DD"),
  set: (value) => {
    performanceTime = dayjs(value);
  },
});

// 耗时分段名称映射
let sectionNameMap: Record<number, string> = {
  0: "<1秒",
  1: "1-5秒",
  2: "5-10秒",
  3: "10-30秒",
  4: ">30秒",
};

//页面性能统计数据
const {
  // : 为解构后取别名
  basicIndicatorStatistics: pagePerformanceData,
  basicIndicatorStatisticsLoading: pagePerformanceLoading,
} = $(
  useBasicIndicatorStatistics(() => {
    return {
      mainType: BasicIndicator.mainType.LoadIndicator,
      subType: BasicIndicator.subType.FullLoad,
      startTime: performanceTime,
      endTime: performanceTime.add(1, "day"),
      granularity: "1d",
    };
  })
);
// 页面加载性能图表参数
const pagePerformanceOption = $computed<EChartsCoreOption>(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "10",
    },
    series: [
      {
        name: "耗时",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true, //展示
            position: "outside", // outside表示文本显示位置为外部
          },
          emphasis: {
            //文本样式
            show: true, //展示
          },
        },
        labelLine: {
          normal: {
            show: true, //引导线显示
          },
        },
        data: pagePerformanceData?.map((section, index) => {
          return {
            name: sectionNameMap[index],
            value: section[0].count,
          };
        }),
      },
    ],
  };
});

// 页面加载列表
const {
  basicIndicators: pagePerformanceDataList,
  basicIndicatorsLoading: pagePerformanceDataListLoading,
} = $(
  useBasicIndicators(() => {
    return {
      mainType: BasicIndicator.mainType.LoadIndicator,
      subType: BasicIndicator.subType.FullLoad,
      startTime: performanceTime,
      endTime: performanceTime.add(1, "day"),
      size: 10,
    };
  })
);
const fl = $computed(() => {
  return (
    (pagePerformanceDataList?.reduce((sum, item) => (sum += item.average), 0) ||
      0) / (pagePerformanceDataList?.length || 1)
  );
});

// 接口性能统计
const {
  interfaceIndicatorStatistics: indicatorStatisticsData,
  interfaceIndicatorStatisticsLoading: indicatorStatisticsLoading,
} = $(
  useInterfaceIndicatorStatistics(() => {
    return {
      mainType: BasicIndicator.mainType.InterfaceIndicator,
      subType: BasicIndicator.subType.InterfaceIndicator,
      startTime: performanceTime,
      endTime: performanceTime.add(1, "day"),
      granularity: "1d",
    };
  })
);
// 接口性能图表参数
const indicatorsPerformanceOption = $computed<EChartsCoreOption>(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "10",
    },
    series: [
      {
        name: "耗时",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true, //展示
            position: "outside", // outside表示文本显示位置为外部
          },
          emphasis: {
            //文本样式
            show: true, //展示
          },
        },
        labelLine: {
          normal: {
            show: true, //引导线显示
          },
        },
        data: indicatorStatisticsData?.map((section, index) => {
          return {
            name: sectionNameMap[index],
            value: section[0].count,
          };
        }),
      },
    ],
  };
});

const {
  interfaceIndicators: indicatorStatisticsDataList,
  interfaceIndicatorsLoading: indicatorStatisticsDataListLoading,
} = useInterfaceIndicators(() => {
  return {
    mainType: BasicIndicator.mainType.InterfaceIndicator,
    subType: BasicIndicator.subType.InterfaceIndicator,
    startTime: performanceTime,
    endTime: performanceTime.add(1, "day"),
    granularity: "1d",
  };
});
// 计算接口请求总量
const totalSumIndicator = $computed(() => {
  return indicatorStatisticsData?.reduce(
    (sum, item) => (sum += item.reduce((s1, i1) => (s1 += i1.count), 0)),
    0
  );
});

// 接口请求平均耗时
const totalAverageIndicator = $computed(() => {
  return totalSumIndicator ? totalSumIndicator / 5 : 0;
});

// 查询接口错误统计
const {
  interfaceErrorStatistics: errorIndicatorStatisticsData,
  interfaceErrorStatisticsLoading: errorIndicatorStatisticsLoading,
} = $(
  useInterfaceErrorStatistics(() => {
    return {
      mainType: BasicIndicator.mainType.InterfaceIndicator,
      subType: BasicIndicator.subType.InterfaceIndicator,
      startTime: performanceTime,
      endTime: performanceTime.add(1, "day"),
      granularity: "1d",
    };
  })
);
// 计算接口错误的总数
const errorIndicator = $computed(() => {
  return errorIndicatorStatisticsData?.reduce(
    (sum, item) => (sum += item.count),
    0
  );
});

//  fcp 指标
const { basicIndicators: fcpData, basicIndicatorsLoading: fcpDataLoading } = $(
  useBasicIndicators(() => {
    return {
      mainType: BasicIndicator.mainType.Performance,
      subType: BasicIndicator.subType.FirstContentfulPaint,
      startTime: performanceTime,
      endTime: performanceTime.add(1, "day"),
      size: 10,
    };
  })
);
const fcp = $computed(() => {
  return (
    (fcpData?.reduce((sum, item) => (sum += item.average), 0) || 0) /
    (fcpData?.length || 1)
  );
});

//  DOMContentLoaded 指标
const { basicIndicators: dclData, basicIndicatorsLoading: dclDataLoading } = $(
  useBasicIndicators(() => {
    return {
      mainType: BasicIndicator.mainType.LoadIndicator,
      subType: BasicIndicator.subType.DOMContentLoaded,
      startTime: performanceTime,
      endTime: performanceTime.add(1, "day"),
      size: 10,
    };
  })
);
const dcl = $computed(() => {
  return (
    (dclData?.reduce((sum, item) => (sum += item.average), 0) || 0) /
    (dclData?.length || 1)
  );
});

const disabledDateHandler = (date: Date) => dayjs(date).isAfter(dayjs());

const totalCount = (val: number): string => {
  if (val < 1000) {
    return Math.floor(val * 100) / 100 + "";
  } else if (val < 10000) {
    return Math.floor((val / 1000) * 100) / 100 + "千";
  } else {
    return Math.floor((val / 10000) * 100) / 100 + "万";
  }
};
const totalTime = (val: number): string => {
  if (val < 1000) {
    return Math.floor(val * 100) / 100 + "ms";
  } else if (val < 10000) {
    return Math.floor((val / 1000) * 100) / 100 + "s";
  }
  return val + "";
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  padding: 5px 35px 0 25px;
  background-color: rgb(240 240 240 / 30%);

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

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
      width: 100px;
      height: 26px;
      border: none;
      outline: none;
    }
  }

  .board {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .data-board {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30%;
      height: 70px;
      padding: 20px 15px;
      background-color: white;
      border-radius: 5px;
    }

    .data-board span:nth-child(1) {
      font-size: 18px;
    }

    .data-board span:nth-child(2) {
      font-size: 30px;
      font-weight: 600;
    }
  }
}

.page-body {
  display: flex;
  margin-top: 20px;

  &-left {
    width: 30%;
    height: 300px;
    margin-right: 10px;
  }

  &-card {
    width: 300px;
    height: 400px;
  }

  &-echarts {
    width: 100%;
    height: 400px;
  }

  &-right {
    flex: 1;

    .list {
      height: 400px;

      .list-item {
        display: flex;
        justify-content: space-between;
        padding: 7px 20px;
      }

      .list-right {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 300px;

        .list-right-item {
          min-width: 60px;
          margin-right: 10px;
          text-align: left;
        }
      }
    }
  }
}
</style>
